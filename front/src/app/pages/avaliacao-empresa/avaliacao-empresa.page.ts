import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { Avaliacao } from 'src/app/model/avaliacao';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empresa } from 'src/app/model/empresa';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-avaliacao-empresa',
  templateUrl: './avaliacao-empresa.page.html',
  styleUrls: ['./avaliacao-empresa.page.scss'],
  standalone:false
})
export class AvaliacaoEmpresaPage implements OnInit {

  usuariosEmpresas: any[] = [];
  avaliacao: Avaliacao;
  stars: number[] = [1, 2, 3, 4, 5];
  
  data: any[] = []; // Empresas do backend
  empresas: any[] = []; // Cópia para exibição e filtragem
  carregando: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private avaliacaoService: AvaliacaoService,
    private usuarioService: UsuarioService
  ) {
    this.avaliacao = new Avaliacao();
  }

  ngOnInit() {
    this.usuarioService.listarEmpresas().subscribe({
      next: (usuariosEmpresas: Usuario[]) => {
        this.usuariosEmpresas = usuariosEmpresas;
        this.carregarEmpresas();
      },
      error: (erro) => {
        console.error('❌ Erro ao carregar usuários empresas:', erro);
        this.carregando = false;
        this.exibirMensagem('Erro ao carregar usuários empresas.');
      }
    });
  }

  carregarEmpresas() {
    this.carregando = true;
    this.usuarioService.listarEmpresasSituacao().subscribe({
      next: (empresas: any[]) => {
        console.log('🏬 Empresas retornadas:', empresas);
        console.log('👥 Usuários empresas:', this.usuariosEmpresas);
        
        // Filtrar apenas empresas ATIVAS
        this.data = empresas
          .filter(e => e.status === 'ACTIVE')
          .map(e => {
            // Buscar o usuário empresa correspondente pelo ID
            const usuarioEmpresa = this.usuariosEmpresas.find(u => u.id === e.usuarioId);
            const nomeEmpresa = usuarioEmpresa ? usuarioEmpresa.nome : 'Empresa';
            
            console.log(`Empresa ID ${e.id} -> Usuário ID ${e.usuarioId} -> Nome: ${nomeEmpresa}`);
            
            return {
              id: e.id,
              nome: e.owner.nome,
              rating: 0,
              imagem: '../../../assets/icon/default-profile.png',
              comentario: ''
            };
          });
        
        this.empresas = [...this.data];
        this.carregando = false;
        console.log('✅ Total de empresas ATIVAS:', this.data.length);
      },
      error: (erro) => {
        console.error('❌ Erro ao carregar empresas:', erro);
        this.carregando = false;
        this.exibirMensagem('Erro ao carregar empresas.');
      }
    });
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    
    if (query.trim() === '') {
      // Se a busca estiver vazia, mostrar todas as empresas
      this.empresas = [...this.data];
    } else {
      // Filtrar apenas as empresas que correspondem à busca
      this.empresas = this.data.filter((empresa) => 
        empresa.nome.toLowerCase().includes(query)
      );
    }
  }

  setRating(empresaIndex: number, star: number) {
    const empresaAtual = this.empresas[empresaIndex];
    // Encontrar a empresa original correspondente pelo nome
    const empresaOriginal = this.data.find(emp => emp.nome === empresaAtual.nome);
    if (empresaOriginal) {
      empresaOriginal.rating = star;
      empresaAtual.rating = star; // Atualizar também na lista filtrada
    }
  }

  submitReview(i: number) {

    this.avaliacao.idEmpresa = this.empresas[i].id;
    this.avaliacao.nota = this.empresas[i].rating;
    this.avaliacao.comentario = this.empresas[i].comentario;
    this.avaliacao.dataAvaliacao = new Date();

    const empresaAtual = this.empresas[i];
    // Encontrar a empresa original correspondente pelo nome
    const empresaOriginal = this.data.find(emp => emp.nome === empresaAtual.nome);
    
    if (empresaOriginal) {
      console.log(`Avaliação para ${empresaOriginal.nome}: ${empresaOriginal.rating} estrelas`);
      console.log(`Comentário: ${empresaOriginal.comentario}`);
      // Aqui você pode adicionar a lógica para enviar a avaliação para um servidor ou armazená-la localmente
      this.avaliacaoService.enviarAvaliacao(this.avaliacao).subscribe({
        next: () => this.exibirMensagem('Avaliação enviada com sucesso!'),
        error: () => this.exibirMensagem('Erro ao enviar avaliação.')
      });

      // Limpar o comentário e rating após o envio
      empresaOriginal.comentario = '';
      empresaOriginal.rating = 0;
      empresaAtual.comentario = '';
      empresaAtual.rating = 0;
    }
  }

  verAvaliacoes(idEmpresa: number) {
    // Navegar para a página de avaliações passando o ID da empresa
    this.router.navigate(['/avaliacoes', idEmpresa]);
  }

  
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

}
