export class Novidade {
  id: number;
  idAdministrador: number;
  titulo: string;
  texto: string;
  dataPublicacao: Date;
  dataAlteracao: Date | null;
  imagemCaminho: string;
  imagemTamanho: number;
  imagemTipo: string;

  constructor() {
    this.id = 0;
    this.idAdministrador = 0;
    this.titulo = '';
    this.texto = '';
    this.dataPublicacao = new Date();
    this.dataAlteracao = null;
    this.imagemCaminho = '';
    this.imagemTamanho = 0;
    this.imagemTipo = '';
  }
}
