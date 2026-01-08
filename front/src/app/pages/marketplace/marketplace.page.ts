import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
  standalone: false
})
export class MarketplacePage implements OnInit, OnDestroy {
  produtos: Produto[] = [];
  currentImageIndexes: Map<number, number> = new Map();
  private imageIntervals: Map<number, any> = new Map();
  public showFab: boolean = true;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  ionViewWillEnter() {
    // Recarrega produtos toda vez que a página é exibida
    this.carregarProdutos();
  }

  ngOnDestroy() {
    // Limpar todos os intervals quando sair da página
    this.imageIntervals.forEach(interval => clearInterval(interval));
    this.imageIntervals.clear();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
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


  verDetalhes(produto: Produto) {
    // Navegar para página de detalhes do produto
    this.router.navigate(['produto-detalhe', produto.id]);
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
