import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-comum',
  templateUrl: './usuario-comum.page.html',
  styleUrls: ['./usuario-comum.page.scss'],
  standalone: false
})
export class UsuarioComumPage implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private usuarioService: UsuarioService
  ) {
    // Unificando em um único FormGroup para corresponder ao seu HTML
    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      email: [{ value: '', disabled: true }], // Corresponde ao 'login' do backend
      senha: ['',Validators.compose([Validators.required, Validators.minLength(8)])], // Senha antiga
      senhaNova: ['', Validators.compose([Validators.required, Validators.minLength(8)])] // Nova senha
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.usuarioService.getMyData().subscribe({
      next: (data: any) => {
        // Preenche o formulário com os dados recebidos
        this.formGroup.patchValue({
          email: data.login, // O campo 'email' do form corresponde ao 'login'
          nome: data.nome
        });
      },
      error: (err) => {
        this.exibirMensagem('Erro ao carregar os dados do usuário.');
        console.error(err);
      }
    });
  }

  updateProfile() {
    if (this.formGroup.get('nome')?.invalid) {
      this.exibirMensagem('O nome é obrigatório.');
      return;
    }

    const nome = this.formGroup.get('nome')?.value;
    this.usuarioService.updateProfile({ nome }).subscribe({
      next: () => {
        this.exibirMensagem('Perfil atualizado com sucesso!');
      },
      error: (err) => {
        this.exibirMensagem('Erro ao atualizar o perfil.');
        console.error(err);
      }
    });
  }

  changePassword() {
    const senhaAntigaControl = this.formGroup.get('senha');
    const novaSenhaControl = this.formGroup.get('senhaNova');

    if (senhaAntigaControl?.invalid || novaSenhaControl?.invalid) {
      this.exibirMensagem('As senhas devem ter no mínimo 8 caracteres.');
      return;
    }

    const data = {
      senhaAntiga: senhaAntigaControl?.value,
      novaSenha: novaSenhaControl?.value
    };

    this.usuarioService.changePassword(data).subscribe({
      next: () => {
        this.exibirMensagem('Senha alterada com sucesso!');
        // Limpa os campos de senha após a alteração
        senhaAntigaControl?.reset();
        novaSenhaControl?.reset();
      },
      error: (err) => {
        const mensagemErro = err.error?.message || 'Erro ao alterar a senha. Tente novamente.';
        this.exibirMensagem(mensagemErro);
        console.error(err);
      }
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
