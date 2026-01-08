// src/app/pages/chatbot/chatbot.page.ts
import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IonContent} from "@ionic/angular";

interface MensagemChat {
    texto: string;
    usuario: number; // 1 = usuário, 0 = chatbot
    timestamp: number;
    action: string | null;
    digitando?: boolean; // Flag para indicar animação de digitando
}

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.page.html',
    styleUrls: ['./chatbot.page.scss'],
    standalone: false
})
export class ChatbotPage implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild(IonContent) ionContent!: IonContent;
    mensagens: MensagemChat[] = [];
    mensagemInput: string = '';
    private apiUrl: string =
        'https://ecodesc.app.n8n.cloud/webhook/1f1c7a6a-0efa-41ff-b5cc-ae656cf6a7ec'; // Substitua pela URL da sua API

    constructor(private http: HttpClient) {}

    ngOnInit() {
        localStorage.removeItem('chatbotMensagens');
        const salvo = localStorage.getItem('chatbotMensagens');
        if (salvo) {
            this.mensagens = JSON.parse(salvo);
        }
    }

    ngAfterViewChecked() {
        this.scrollParaBaixo();
    }

    private scrollParaBaixo() {
        if (this.ionContent) {
            setTimeout(() => {
                this.ionContent.scrollToBottom(0);
            }, 0);
        }
    }

    private extractBotText(resposta: any): { texto: string; action: string | null } {
        const payload = Array.isArray(resposta) ? resposta[0] : resposta;

        if (payload === null || payload === undefined) {
            return { texto: 'Sem resposta', action: null };
        }

        const action: string | null =
            typeof payload === 'object' && payload ? (payload as any).action ?? null : null;

        // Keys we do NOT want to display as the chat message
        const blacklist = new Set([
            'action',
            'timestamp',
            'time',
            'date',
            'status',
            'code',
            'id',
            'uuid',
            'token',
            'debug'
        ]);

        // Keys we PREFER if they exist (still optional)
        const preferred = ['query', 'texto', 'text', 'message', 'content', 'response', 'reply', 'answer', 'output'];

        const isNonEmptyString = (v: any): v is string => typeof v === 'string' && v.trim().length > 0;

        const pickPreferred = (obj: any): string | null => {
            if (!obj || typeof obj !== 'object') return null;
            for (const k of preferred) {
                if (isNonEmptyString(obj[k])) return obj[k].trim();
            }
            return null;
        };

        const findFirstStringDeep = (value: any, depth = 0): string | null => {
            if (depth > 6) return null; // prevent runaway recursion
            if (isNonEmptyString(value)) return value.trim();
            if (!value || typeof value !== 'object') return null;

            // 1) Try preferred keys at this level
            const preferredHit = pickPreferred(value);
            if (preferredHit) return preferredHit;

            // 2) Traverse arrays/objects and return the first meaningful string
            if (Array.isArray(value)) {
                for (const item of value) {
                    const hit = findFirstStringDeep(item, depth + 1);
                    if (hit) return hit;
                }
                return null;
            }

            for (const [k, v] of Object.entries(value)) {
                if (blacklist.has(k)) continue;
                const hit = findFirstStringDeep(v, depth + 1);
                if (hit) return hit;
            }

            return null;
        };

        const texto = findFirstStringDeep(payload) ?? 'Sem resposta';
        return { texto, action };
    }



    enviarMensagem() {
        if (!this.mensagemInput.trim()) return;

        // Adiciona mensagem do usuário
        const mensagemUsuario = this.mensagemInput;
        this.mensagens.push({
            texto: mensagemUsuario,
            usuario: 1,
            timestamp: Date.now(),
            action: null
        });
        this.salvarMensagens();
        this.mensagemInput = '';

        // Adiciona indicador de "digitando..."
        const mensagemDigitando: MensagemChat = {
            texto: '',
            usuario: 0,
            timestamp: Date.now(),
            action: null,
            digitando: true
        };
        this.mensagens.push(mensagemDigitando);

        // Chama a API do chatbot
        this.http.post<any>(this.apiUrl, { message: mensagemUsuario }).subscribe({
            next: (resposta) => {
                // Remove o indicador de "digitando..."
                const indexDigitando = this.mensagens.findIndex((m) => m.digitando);
                if (indexDigitando !== -1) {
                    this.mensagens.splice(indexDigitando, 1);
                }

                // Processa a resposta JSON da API (normaliza array/object)
                const extraido = this.extractBotText(resposta);
                const mensagemBot: MensagemChat = {
                    texto: extraido.texto,
                    usuario: 0,
                    timestamp: Date.now(),
                    action: extraido.action
                };

                this.mensagens.push(mensagemBot);
                this.salvarMensagens();
            },
            error: (error) => {
                console.error('Erro ao chamar API do chatbot:', error);

                // Remove o indicador de "digitando..."
                const indexDigitando = this.mensagens.findIndex((m) => m.digitando);
                if (indexDigitando !== -1) {
                    this.mensagens.splice(indexDigitando, 1);
                }

                // Mensagem de erro
                this.mensagens.push({
                    texto: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
                    usuario: 0,
                    timestamp: Date.now(),
                    action: null
                });
                this.salvarMensagens();
            }
        });
    }

    // Só mostra o input se o último action for nulo ou se não houver mensagens
    podeEnviar(): boolean {
        // Only block while bot is "typing"
        return !this.mensagens.some((m) => m.digitando);
    }

    salvarMensagens() {
        localStorage.setItem('chatbotMensagens', JSON.stringify(this.mensagens));
    }

    apagarConversa() {
        localStorage.removeItem('chatbotMensagens');
        this.mensagens = [];
    }

    ngOnDestroy() {
        localStorage.removeItem('chatbotMensagens');
    }
}