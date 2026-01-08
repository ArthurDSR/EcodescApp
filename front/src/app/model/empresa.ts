export class Empresa {
  id: string;
  cnpj: string;
  createdAt: string;
  documentPath: string;
  status: string;
  usuarioId: string;

  constructor() {
    this.id = '';
    this.cnpj = '';
    this.createdAt = new Date().toISOString();
    this.documentPath = '';
    this.status = 'PENDING';
    this.usuarioId = '';
  }
}
