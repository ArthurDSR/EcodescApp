import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage implements OnInit {

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  termoPesquisa: string = '';
  carregando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando = true;
    this.usuarioService.listarUsuariosComuns().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = data;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.mostrarToast('Erro ao carregar usuários', 'danger');
        this.carregando = false;
      }
    });
  }

  pesquisar(event: any) {
    this.termoPesquisa = event.target.value.toLowerCase();
    
    if (!this.termoPesquisa) {
      this.usuariosFiltrados = this.usuarios;
      return;
    }

    this.usuariosFiltrados = this.usuarios.filter(usuario => 
      usuario.nome.toLowerCase().includes(this.termoPesquisa) ||
      usuario.login.toLowerCase().includes(this.termoPesquisa)
    );
  }

  async promoverParaAdmin(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar promoção',
      message: `Deseja promover ${usuario.nome} para administrador?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Promover',
          handler: () => {
            this.confirmarPromocao(usuario.id);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmarPromocao(usuarioId: string) {
    this.usuarioService.promoverParaAdmin(usuarioId).subscribe({
      next: () => {
        this.mostrarToast('Usuário promovido a administrador com sucesso!', 'success');
        this.carregarUsuarios();
      },
      error: (error) => {
        console.error('Erro ao promover usuário:', error);
        this.mostrarToast('Erro ao promover usuário', 'danger');
      }
    });
  }

  async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: cor,
      position: 'bottom'
    });
    toast.present();
  }

  getTipoUsuario(usuario: any): string {
    if (usuario.tipoUsuario === 'EMPRESA' || usuario.role === 'BUSINESS') {
      return 'Empresa';
    }
    return 'Comum';
  }

  getRoleLabel(role: string): string {
    switch(role) {
      case 'ADMIN': return 'Administrador';
      case 'BUSINESS': return 'Empresa';
      case 'USER': return 'Usuário';
      default: return role;
    }
  }


}
