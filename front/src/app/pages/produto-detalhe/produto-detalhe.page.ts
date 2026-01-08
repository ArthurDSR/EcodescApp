import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.page.html',
  styleUrls: ['./produto-detalhe.page.scss'],
  standalone: false
})
export class ProdutoDetalhePage implements OnInit, OnDestroy {
  produto: Produto | null = null;
  currentImageIndex: number = 0;
  private imageInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarProduto(Number(id));
    }
  }

  ngOnDestroy() {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
  }

  selecionarImagem(index: number) {
    this.currentImageIndex = index;
  }


  getImagemUrl(produto: Produto): string {
    if (!produto.imagemCaminho) {
      // Imagem padrão se não houver imagem
      return '../../../assets/icon/fundo-inicio 1.png';
    }


    // Se for apenas nome do arquivo
    if (produto.imagemCaminho.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      return `http://localhost:8080/uploads/${produto.imagemCaminho}`;
    }

    // Fallback para assets
    return `../../../assets/icon/${produto.imagemCaminho}`;
  }


  carregarProduto(id: number) {

    this.produtoService.buscarPorId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        if (this.produto.imagemCaminho) {
          this.currentImageIndex = 0;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar produto:', err);
        this.exibirMensagem('Erro ao carregar detalhes do produto');
      }
    });
  }

  async enviarMensagem() {
    if (this.produto && this.produto.id) {
      // Navega passando apenas o produtoId
      this.router.navigate(['/chat-anuncio'], {
        queryParams: {
          queryParams: {
            recipientId: this.produto.usuario_id,
          }
        }
      });
    }
  }

    formatarPreco(preco: number): string {
      return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

  async exibirMensagem(mensagem: string) {
      const toast = await this.toastController.create({
        message: mensagem,
        duration: 2000,
        position: 'bottom',
        color: 'primary'
      });
      toast.present();
    }

    voltar() {
      this.router.navigate(['/marketplace']);
    }
  }
