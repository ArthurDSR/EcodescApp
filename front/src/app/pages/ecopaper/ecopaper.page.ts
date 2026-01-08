import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SerpApiService, ArticleSummary } from '../../services/serp-api.service'; // Importe o serviço e a interface

@Component({
  selector: 'app-ecopaper',
  templateUrl: './ecopaper.page.html',
  styleUrls: ['./ecopaper.page.scss'],
  standalone: false
})
export class EcopaperPage implements OnInit {
  formGroup: FormGroup;
  searchResults: ArticleSummary[] = [];
  isLoading = false;
  searchAttempted = false; // Para saber se uma busca já foi feita

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private serpApiService: SerpApiService // Injete o novo serviço
  ) {
    this.formGroup = this.formBuilder.group({
      'busca': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  buscar() {
    if (this.formGroup.invalid) {
      this.exibirMensagem('Por favor, digite um termo para a busca.');
      return;
    }
    const busca = this.formGroup.value.busca;

    this.isLoading = true;
    this.searchAttempted = true;
    this.searchResults = []; // Limpa resultados anteriores

    this.serpApiService.search(busca).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
        if (results.length === 0) {
          this.exibirMensagem('Nenhum artigo encontrado para este termo.');
        }
      },
      error: (err) => {
        console.error(err);
        this.exibirMensagem('Erro ao buscar artigos. Verifique sua conexão ou tente novamente.');
        this.isLoading = false;
      }
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }
}
