import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.page.html',
  styleUrls: ['./cadastro-empresa.page.scss'],
  standalone:false
})
export class CadastroEmpresaPage implements OnInit {

  usuario: Usuario;
  formGroup: FormGroup;
  cdfFile: File | null = null;
  cdfNomeArquivo: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private authService: AuthService,
    private http: HttpClient
  ) { 
    this.usuario = new Usuario();
    this.formGroup = this.formBuilder.group({
      'nome': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'login': ['', Validators.compose([Validators.required, Validators.email])],
      'senha': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'cnpj': ['', Validators.compose([Validators.required, Validators.minLength(14)])]
    });
  }

  ngOnInit() {

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de arquivo (PDF ou imagem)
      const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!tiposPermitidos.includes(file.type)) {
        this.exibirMensagem('Arquivo inválido. Envie PDF ou imagem (JPG/PNG).');
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
      if (file.size > tamanhoMaximo) {
        this.exibirMensagem('Arquivo muito grande. Tamanho máximo: 5MB');
        return;
      }
      
      this.cdfFile = file;
      this.cdfNomeArquivo = file.name;
      console.log('📄 Arquivo CDF selecionado:');
      console.log('   - Nome:', file.name);
      console.log('   - Tipo:', file.type);
      console.log('   - Tamanho:', (file.size / 1024).toFixed(2), 'KB');
    }
  }

  
  async cadastrar() {
    if (!this.formGroup.valid) {
      this.exibirMensagem('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (!this.cdfFile) {
      this.exibirMensagem('Por favor, selecione o arquivo CDF.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cadastrando empresa...'
    });
    await loading.present();

    try {
      // Criar objeto JSON com os dados
      const businessData = {
        nome: this.formGroup.value.nome,
        login: this.formGroup.value.login,
        password: this.formGroup.value.senha,
        cnpj: this.formGroup.value.cnpj
      };

      // Criar FormData com @RequestPart("data") como JSON e @RequestPart("document") como arquivo
      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(businessData)], { type: 'application/json' }));
      formData.append('document', this.cdfFile, this.cdfFile.name);

      console.log('📤 Enviando cadastro de empresa:');
      console.log('   - Dados:', businessData);
      console.log('   - Arquivo:', this.cdfFile.name, '(', this.cdfFile.type, ')');
      console.log('   - Tamanho do arquivo:', this.cdfFile.size, 'bytes');

      // Enviar para o backend
      this.http.post('http://localhost:8080/auth/register-business', formData).subscribe({
        next: async (response) => {
          console.log('Empresa cadastrada com sucesso:', response);
          await loading.dismiss();
          await this.exibirMensagem('Empresa cadastrada! Aguarde aprovação do administrador.');
          this.router.navigate(['/login']);
        },
        error: async (erro) => {
          console.error('Erro ao cadastrar empresa:', erro);
          await loading.dismiss();
          let mensagemErro = 'Erro ao cadastrar empresa.';
          
          if (erro.status === 400) {
            mensagemErro = 'Email ou CNPJ já cadastrado.';
          } else if (erro.error?.message) {
            mensagemErro = erro.error.message;
          }
          
          await this.exibirMensagem(mensagemErro);
        }
      });
    } catch (error) {
      await loading.dismiss();
      console.error('Erro inesperado:', error);
      await this.exibirMensagem('Erro inesperado ao cadastrar.');
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
