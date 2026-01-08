export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

export class Mensagem {
  id?: number;
  chatRoomId?: string;
  senderId: string;
  recipientId: string;
  produtoId: string;
  content: string;
  timestamp: string;
  status: MessageStatus;

  constructor() {
    this.id = 0;
    this.chatRoomId = '';
    this.senderId = '';
    this.recipientId = '';
    this.produtoId = '';
    this.content = '';
    this.timestamp = new Date().toISOString();
    this.status = MessageStatus.SENT;
  }
}
