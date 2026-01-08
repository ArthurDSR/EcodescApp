import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import {AlertController, ToastController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {

  usuario: Usuario
  formGroup: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastController: ToastController, private alertController: AlertController) {
    this.usuario = new Usuario(); // Inicializa o usuário
      this.formGroup = this.formBuilder.group({
        'login': [this.usuario.login, Validators.compose([Validators.required])],
        'senha': ['', Validators.compose([Validators.required])],
      });
     }


  ngOnInit() {
    //lembrar de encerrar autenticacao
    this.authService.logout();

  }

  autenticar() {
    if (this.formGroup.invalid) {
      this.exibirMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const login = this.formGroup.value.login;
    const password = this.formGroup.value.senha;

    this.authService.login({ login, password }).subscribe({
      next: () => this.router.navigate(['/inicio'], { replaceUrl: true }),
      error: () => this.exibirMensagem('Falha no login. Verifique suas credenciais.'),
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

}
