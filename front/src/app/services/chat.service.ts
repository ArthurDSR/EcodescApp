import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '@stomp/stompjs';
import  SockJS  from 'sockjs-client';

/* 🔹 MODELS */

export interface ChatMessage {
  id?: number;
  chatRoomId?: string;
  senderId?: string;
  recipientId: string;
  senderName?: string;
  content: string;
  timestamp?: string;
}

export interface ChatSummaryDTO {
  chatRoomId: string;
  otherUserId: string;
  otherUserName: string;
  senderName: string;
  lastMessage: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private API = 'http://localhost:8080';
  private WS = 'http://localhost:8080/ws';

  private stompClient!: Client;

  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);
  messages$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {}

  /* ==========================
     🔌 WEBSOCKET
     ========================== */

  connect(token: string) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.WS),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: () => {
        this.stompClient.subscribe('/user/queue/messages', msg => {
          this.messageSubject.next(JSON.parse(msg.body));
        });
      }
    });

    this.stompClient.activate();
  }

  sendMessage(message: ChatMessage) {
    this.stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  /* ==========================
     📥 REST
     ========================== */

  /** 🔹 Conversas do usuário logado */
  getConversations(): Observable<ChatSummaryDTO[]> {
    return this.http.get<ChatSummaryDTO[]>(`${this.API}/conversations`);
  }

  /** 🔹 Histórico de mensagens */
  getMessages(recipientId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(
      `${this.API}/messages/${recipientId}`
    );
  }
}
