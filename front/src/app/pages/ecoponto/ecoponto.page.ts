import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Ecoponto } from 'src/app/model/ecoponto';
import { EcopontoService } from 'src/app/services/ecoponto.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-ecoponto',
  templateUrl: './ecoponto.page.html',
  styleUrls: ['./ecoponto.page.scss'],
  standalone:false
})
export class EcopontoPage implements OnInit {

  // Lista de ecopontos de teste
  ecopontos: Ecoponto[] = [
  ];


  constructor(private router: Router, private ecopontoService: EcopontoService, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter - Atualizando lista...');
    this.listar();
  }

  listar() {
    this.ecopontoService.listarTodos().subscribe({
      next: (ecopontos) => {
        this.ecopontos = ecopontos;
      },
      error: (err) => {
        this.exibirMensagem('Erro ao carregar os ecopontos.');
      }
    });
  }


  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  adicionar() {
    this.router.navigate(['/add-ecoponto']);
  }

  editar(ecoponto: Ecoponto) {
    console.log('Ecoponto completo:', ecoponto);
    this.router.navigate(['/add-ecoponto', { id: ecoponto.id }]);
  }

  excluir(ecoponto: Ecoponto) {
    this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja excluir este ecoponto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.ecopontoService.excluir(ecoponto.id).subscribe({
              next: () => {
                this.exibirMensagem('Ecoponto excluído com sucesso.');
                this.listar(); // Atualizar a lista após a exclusão
              },
              error: (err) => {
                this.exibirMensagem('Erro ao excluir ecoponto.');
              }
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
