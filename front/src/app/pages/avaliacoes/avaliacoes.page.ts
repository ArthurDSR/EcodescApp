import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { Avaliacao } from 'src/app/model/avaliacao';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.page.html',
  styleUrls: ['./avaliacoes.page.scss'],
  standalone: false
})
export class AvaliacoesPage implements OnInit {

  avaliacoes: Avaliacao[] = [];
  idEmpresa: number = 0;
  carregando: boolean = true;
  mediaAvaliacoes: number = 0;
  totalAvaliacoes: number = 0;
  Math = Math; // Expor Math para o template
  isAdmin: boolean = false;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Verifica se o usuário é admin
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    this.isAdmin = tipoUsuario === 'admin';

    // Pegar o ID da empresa da rota ou localStorage
    const id = this.activatedRoute.snapshot.params['idEmpresa'];
    if (id) {
      this.idEmpresa = parseInt(id);
    } else {
      // Se não vier da rota, pega do localStorage (empresa logada)
      const empresaId = localStorage.getItem('empresaId');
      if (empresaId) {
        this.idEmpresa = parseInt(empresaId);
      }
    }

    if (this.idEmpresa) {
      this.carregarAvaliacoes();
    } else {
      this.exibirMensagem('ID da empresa não encontrado');
    }
  }

  carregarAvaliacoes() {
    this.carregando = true;
    this.avaliacaoService.listarAvaliacoesPorEmpresa(this.idEmpresa).subscribe({
      next: (avaliacoes) => {
        console.log('Avaliações carregadas:', avaliacoes);
        this.avaliacoes = avaliacoes;
        this.totalAvaliacoes = avaliacoes.length;
        this.calcularMedia();
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar avaliações:', error);
        this.carregando = false;
      }
    });
  }

  excluirAvaliacao(id: number) {
    this.avaliacaoService.excluirAvaliacao(id).subscribe({
      next: () => {
        this.exibirMensagem('Avaliação excluída com sucesso!');
        this.carregarAvaliacoes();
      },
      error: () => {
        this.exibirMensagem('Erro ao excluir avaliação.');
      }
    });
  }

  calcularMedia() {
    if (this.avaliacoes.length > 0) {
      const soma = this.avaliacoes.reduce((acc, av) => acc + av.nota, 0);
      this.mediaAvaliacoes = soma / this.avaliacoes.length;
    } else {
      this.mediaAvaliacoes = 0;
    }
  }

  // Retorna um array para renderizar as estrelas
  getStars(nota: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < nota);
  }

  // Formata a data
  formatarData(data: Date): string {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }

}
