import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importação para navegação
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
  standalone: false
})
export class CadastroUsuarioPage implements OnInit {

  usuario: Usuario
  formGroup: FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private toastController: ToastController, private activatedRoute: ActivatedRoute,
    private navController: NavController) {
    this.usuario = new Usuario(); // Inicializa o usuário
    this.formGroup = this.formBuilder.group({
      'nome': [this.usuario.nome, Validators.compose([Validators.required])],
      'login': [this.usuario.login, Validators.compose([Validators.required])],
      'senha': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  async cadastrar() {
    if (this.formGroup.invalid) {
      this.exibirMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const nome = this.formGroup.value.nome;
    const login = this.formGroup.value.login;
    const password = this.formGroup.value.senha;
    //logica de cadastro

    this.authService.register({ nome, login, password }).subscribe({
      next: () => {
        this.authService.login({ login, password }).subscribe({
          next: () => {
            this.router.navigate(['/inicio'], { replaceUrl: true });
          },
          error: () => this.exibirMensagem('Falha no Cadastro. Verifique suas credenciais.'),
        })
      },
      error: () => this.exibirMensagem('Falha no Cadastro. Verifique suas credenciais.'),
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
