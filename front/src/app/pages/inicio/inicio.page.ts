import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NovidadeService } from 'src/app/services/novidade.service';
import { Novidade } from 'src/app/model/novidade';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit {

  novidades: Novidade[];

  constructor(
    private router: Router,
    private novidadeService: NovidadeService
  ) {
    this.novidades = [];
  }

  ngOnInit() {
    this.carregarNovidades();
  }

  ionViewWillEnter() {
    // Atualizar novidades quando a página se tornar visível
    this.carregarNovidades();
  }

  carregarNovidades() {
    console.log('Carregando novidades...');

    this.novidadeService.listarTodos().subscribe({
      next: (novidades: Novidade[]) => {
        this.novidades = novidades;
        console.log('Novidades carregadas:', this.novidades);
      },
      error: (error) => {
        console.error('Erro ao carregar novidades:', error);
        // Em caso de erro, manter array vazio (não quebra a interface)
        this.novidades = [];
      }
    });
  }

  // Método para construir URL da imagem
  getImagemUrl(novidade: Novidade): string {
    if (!novidade.imagemCaminho) {
      // Imagem padrão se não houver imagem
      return '../../../assets/icon/fundo-inicio 1.png';
    }


    // Se for apenas nome do arquivo
    if (novidade.imagemCaminho.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      return `http://localhost:8080/uploads/${novidade.imagemCaminho}`;
    }

    // Fallback para assets
    return `../../../assets/icon/${novidade.imagemCaminho}`;
  }

  // Método para navegar para detalhes da novidade
  verDetalhes(novidade: Novidade) {
    this.router.navigate(['/novidade-detalhe', { id: novidade.id }]);
  }

  // Método para formatar data de publicação
  formatarData(data: Date): string {
    if (!data) return '';

    const dataObj = new Date(data);
    const dataLocal = new Date(dataObj.getTime() + dataObj.getTimezoneOffset() * 60000);

    return dataLocal.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  trackByNovidadeId(index: number, novidade: Novidade): number {
    return novidade.id;
  }
}
