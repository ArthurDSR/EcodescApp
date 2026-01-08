import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Novidade } from 'src/app/model/novidade';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NovidadeService } from 'src/app/services/novidade.service';
@Component({
  selector: 'app-novidade',
  templateUrl: './novidade.page.html',
  styleUrls: ['./novidade.page.scss'],
  standalone:false
})
export class NovidadePage implements OnInit {

  // Lista de novidades de teste
  novidades: Novidade[];

  constructor(private router: Router, private novidadeService: NovidadeService, private toastController: ToastController, private alertController: AlertController) {
    this.novidades = [];
  }

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter - Atualizando lista...');
    this.listar();
  }

  listar() {
    this.novidadeService.listarTodos().subscribe({
      next: (novidades) => {
        this.novidades = novidades;
      },
      error: (err) => {
        this.exibirMensagem('Erro ao carregar as novidades.');
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
    this.router.navigate(['/add-novidade']);
  }

  editar(novidade: Novidade) {
    console.log('Novidade completa:', novidade);
    this.router.navigate(['/add-novidade', { id: novidade.id }]);
  }

  excluir(novidade: Novidade) {
    this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja excluir este novidade?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.novidadeService.excluir(novidade.id).subscribe({
              next: () => {
                this.exibirMensagem('novidade excluído com sucesso.');
                this.listar(); // Atualizar a lista após a exclusão
              },
              error: (err) => {
                this.exibirMensagem('Erro ao excluir novidade.');
              }
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
