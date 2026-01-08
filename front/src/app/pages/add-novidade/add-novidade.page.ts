import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NovidadeService } from 'src/app/services/novidade.service';
import { Novidade } from 'src/app/model/novidade';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'


@Component({
  selector: 'app-add-novidade',
  templateUrl: './add-novidade.page.html',
  styleUrls: ['./add-novidade.page.scss'],
  standalone: false
})
export class AddNovidadePage implements OnInit {


  novidade: Novidade;
  preview: string | ArrayBuffer | null = null;
  file: File | null = null;
  formGroup: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private http: HttpClient,
    private novidadeService: NovidadeService) {

    this.novidade = new Novidade();
    this.formGroup = this.formBuilder.group({
      'titulo': ['', Validators.compose([Validators.required])],
      'texto': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.novidadeService.buscarPorId(id).subscribe({
        next: (novidade: any) => {
          this.novidade = novidade;

          this.formGroup.patchValue({
            titulo: this.novidade.titulo,
            texto: this.novidade.texto
          });

          // 👇 Se veio imagem no backend, joga no preview
          if (this.novidade.imagemCaminho) {
            // exemplo: se backend retorna só o nome, monta a URL completa
            this.preview = `http://localhost:8080/uploads/${this.novidade.imagemCaminho}`;
          }
          console.log('Preview da imagem:', this.preview);
          console.log('Novidade carregada para edição:', this.novidade);
        },
        error: (error) => {
          console.error(error);
          this.exibirMensagem('Erro ao carregar a novidade.');
        }
      });
    }
  }

  ngAfterViewInit() {
    // Se estiver editando, carregar a imagem existente
    this.preview = this.novidade.imagemCaminho;
  }

  public async selecionarImagem() {
    try {
      const result = await Camera.pickImages({
        limit: 1,                     // apenas uma imagem
        quality: 90
      });

      if (result.photos.length > 0) {
        const photo = result.photos[0];

        // Se for iOS/Android, pode ser result.base64String ou path
        if (photo.webPath) {
          this.preview = photo.webPath; // para exibir no preview
        }


        // Convertendo para File para enviar via FormData
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        let extension = blob.type.split('/')[1]; // pega só "png", "jpeg", etc.
        extension = extension.replace('+xml', ''); // fica "svg"
        this.file = new File([blob], `imagemSelecionada.${extension}`, { type: blob.type });
      }
    } catch (err) {
      console.error("Erro ao selecionar imagem:", err);
    }
  }

  public salvarNovidade() {
    if (this.formGroup.invalid) {
      this.exibirMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Cria o objeto FormData para enviar como multipart/form-data
    const formData = new FormData();
    formData.append("titulo", this.formGroup.value.titulo);
    formData.append("texto", this.formGroup.value.texto);

    if (this.file) {
      formData.append("imagem", this.file); // nome "imagem" precisa ser o mesmo que o backend espera
    }

    console.log('Enviando novidade com imagem...', formData);

    // Se estiver editando
    if (this.novidade.id) {
      this.novidade.dataAlteracao = new Date();
      this.novidadeService.atualizarComImagem(this.novidade.id, formData).subscribe({
        next: () => {
          this.exibirMensagem('Novidade atualizada com sucesso!!!');
          this.router.navigate(['/novidade'], { replaceUrl: true });
        },
        error: (err) => {
          console.error(err);
          this.exibirMensagem('Erro ao atualizar a novidade.');
        }
      });
    } else {
      this.novidadeService.salvarComImagem(formData).subscribe({
        next: () => {
          this.exibirMensagem('Novidade salva com sucesso!!!');
          this.router.navigate(['/novidade'], { replaceUrl: true });
        },
        error: (err) => {
          console.error(err);
          this.exibirMensagem('Erro ao salvar a novidade.');
        }
      });
    }

    this.router.navigate(['/novidade'], { replaceUrl: true });
  }


  public limpar() {
    // Limpar formulário
    this.formGroup.reset();
    this.preview = null;

  }

  public voltar() {
    this.router.navigate(['/novidade'], { replaceUrl: true });
  }



  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }


}
