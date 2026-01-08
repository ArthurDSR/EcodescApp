import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NovidadeService } from 'src/app/services/novidade.service';
import { Novidade } from 'src/app/model/novidade';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-novidade-detalhe',
  templateUrl: './novidade-detalhe.page.html',
  styleUrls: ['./novidade-detalhe.page.scss'],
  standalone: false
})
export class NovidadeDetalhePage implements OnInit {

  novidade: Novidade;
  constructor(
    private router: Router,
    private novidadeService: NovidadeService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,) {
    this.novidade = new Novidade();
  }

  ngOnInit() {
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.novidadeService.buscarPorId(id).subscribe({
        next: (novidade: any) => {
          this.novidade = novidade;
        },
        error: (error) => {
          console.error(error);
          this.exibirMensagem('Erro ao carregar a novidade.');
        }
      });
    }
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






  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()

  }
}
