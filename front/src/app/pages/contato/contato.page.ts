import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
  standalone: false
})
export class ContatoPage implements OnInit {

  email = '';
  assunto = '';
  mensagem = '';


  formGroup: FormGroup;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private http: HttpClient,
    private emailService: EmailService) {

    this.formGroup = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'assunto': ['', Validators.compose([Validators.required])],
      'mensagem': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  enviar() {
    if (this.formGroup.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    this.email = this.formGroup.value.email;
    this.assunto = this.formGroup.value.assunto;
    this.mensagem = this.formGroup.value.mensagem;
    this.emailService.enviarEmail(this.email, this.assunto, this.mensagem)
      .subscribe({
        next: () => {
        },
        error: () => {

        }
      });

    alert('Email enviado com sucesso!');
    this.formGroup.reset();
  }

}
