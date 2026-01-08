export class Avaliacao {
  id: number;
  idEmpresa: number;
  idUsuarioComum: number;
  nota: number;
  comentario: string;
  dataAvaliacao: Date;
  nomeUsuario?: string; // Campo opcional para o nome do usuário

  constructor() {
    this.id = 0;
    this.idEmpresa = 0;
    this.idUsuarioComum = 0;
    this.nota = 0;
    this.comentario = '';
    this.dataAvaliacao = new Date();
  }
}
