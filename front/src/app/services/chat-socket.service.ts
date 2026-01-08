import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  conversationId: string;
  senderId:string | null;
  token?: string | null;
  content: string;
  timestamp?: string | Date;
  recipientId?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatSocketService {
  private socket!: Socket;
  url: string = 'http://localhost:8080/api/v1/message';

  constructor(private httpClient: HttpClient) { }

  connect() {
    this.socket = io('http://localhost:3001');
  }

  disconnect() {
    this.socket?.disconnect();
  }

  join(conversationId: string) {
    this.socket.emit('join', conversationId);
  }

  sendMessage(message: ChatMessage) {
    this.socket.emit('send-message', message);
  }

  onMessage(cb: (msg: ChatMessage) => void): () => void {
    this.socket.on('new-message', cb);
    return () => this.socket.off('new-message', cb);
  }

  buscarMensagens(conversationId: string): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(`${this.url}/${conversationId}`);
  }
}
