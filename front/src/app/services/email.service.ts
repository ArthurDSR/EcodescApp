import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/email';

  constructor(private http: HttpClient) {}

  enviarEmail(email: string, assunto: string, mensagem: string) {
    console.log('Enviando email para:', email);
    console.log('Assunto:', assunto);
    console.log('Mensagem:', mensagem);
    // Ajuste a URL e o corpo da requisição conforme a API do seu backend
    return this.http.post(`${this.apiUrl}/enviar`, {
      email,
      assunto,
      mensagem
    });
  }
}
