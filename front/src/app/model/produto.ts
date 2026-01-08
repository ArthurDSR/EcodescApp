export class Produto {
  id?: number;
  titulo: string;
  categoria_id: string;
  status: string;
  descricao: string;
  preco: number;
  imagemCaminho: string;
  imagemTamanho: number;
  imagemTipo: string;
  usuario_id: number;
  dataPublicacao: Date;

  constructor() {
    this.id = 0;
    this.titulo = '';
    this.categoria_id = '';
    this.status = '';
    this.descricao = '';
    this.preco = 0;
    this.imagemCaminho = '';
    this.imagemTamanho = 0;
    this.imagemTipo = '';
    this.usuario_id = 0;
    this.dataPublicacao = new Date();
  }
}
