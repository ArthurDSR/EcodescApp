import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController } from '@ionic/angular';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
  standalone: false
})
export class EmpresasPage implements OnInit {
  empresas: any[] = [];
  empresasFiltradas: any[] = [];
  searchTerm: string = '';
  carregando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.carregarEmpresas();
  }

  ionViewWillEnter() {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.carregando = true;
    this.usuarioService.listarEmpresasSituacao().subscribe({
      next: (empresas) => {
        console.log('📋 Empresas retornadas do backend:', empresas);
        
        // Filtrar APENAS empresas com situação PENDING
        this.empresas = (empresas as any[]).filter(e => e.status === 'PENDING');
        
        this.empresasFiltradas = [...this.empresas];
        this.carregando = false;
        console.log('✅ Total de empresas PENDING:', this.empresas.length);
        
        if (this.empresas.length === 0) {
          console.log('ℹ️ Nenhuma empresa PENDING encontrada');
        }
      },
      error: (erro) => {
        console.error('❌ Erro ao carregar empresas:', erro);
        this.exibirMensagem('Erro ao carregar empresas.');
        this.carregando = false;
      }
    });
  }

  pesquisar() {
    const termo = this.searchTerm.toLowerCase().trim();
    if (!termo) {
      this.empresasFiltradas = [...this.empresas];
    } else {
      this.empresasFiltradas = this.empresas.filter(empresa =>
        empresa.owner.nome.toLowerCase().includes(termo) ||
        empresa.owner.login.toLowerCase().includes(termo)
      );
    }
  }

  async aprovarEmpresa(empresa: Usuario) {
    const alert = await this.alertController.create({
      header: 'Aprovar Empresa',
      message: `Deseja aprovar <strong>${empresa.nome}</strong> como empresa?<br><br>A empresa receberá permissões especiais.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aprovar',
          handler: () => {
            this.confirmarAprovacao(empresa);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmarAprovacao(empresa: any) {
    console.log('🔄 Aprovando empresa ID:', empresa.id);
    this.usuarioService.aprovarEmpresa(empresa.id).subscribe({
      next: () => {
        console.log('✅ Empresa aprovada com sucesso');
        this.exibirMensagem(`${empresa.nome} foi aprovada como empresa!`);
        // Remover da lista e recarregar
        this.carregarEmpresas();
      },
      error: (erro) => {
        console.error('❌ Erro ao aprovar empresa:', erro);
        const mensagem = erro.error?.message || 'Erro ao aprovar empresa.';
        this.exibirMensagem(mensagem);
      }
    });
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
