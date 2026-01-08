export class Usuario {
    id: string;
    nome: string;
    login: string;
    role: string; // 'USER', 'BUSINESS', 'ADMIN'
    tipoUsuario: string; // 'COMUM' ou 'EMPRESA'

    constructor() {
      this.id = '';
      this.nome = '';
      this.login = '';
      this.role = 'USER';
      this.tipoUsuario = 'COMUM';
    }
}
