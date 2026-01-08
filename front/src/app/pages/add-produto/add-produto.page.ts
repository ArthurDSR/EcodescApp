import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService, Categoria } from 'src/app/services/categoria.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhoneMaskDirective } from 'src/app/directives/phone-mask.directive';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
  standalone: false
})
export class AddProdutoPage implements OnInit {
  produto: Produto;
  preview: string | null = null; // URL de preview da imagem selecionada
  file: File | null = null; // Arquivo selecionado
  formGroup: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private produtoService: ProdutoService,
    private authService: AuthService,
    private categoriaService: CategoriaService,
  ) {
    this.produto = new Produto();
    this.formGroup = this.formBuilder.group({
      'nome': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'descricao': ['', Validators.compose([Validators.required])],
      'preco': ['', Validators.compose([Validators.required, Validators.min(0.01)])],
      'categoria': ['', Validators.compose([Validators.required])],
      'detalhes': ['']
    });
  }

  ngOnInit() {
    this.carregarCategorias();
    
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      // Modo edição
      this.produtoService.buscarPorId(id).subscribe({
        next: (produto: any) => {
          this.produto = produto;
          this.formGroup.patchValue({
            nome: this.produto.titulo,
            descricao: this.produto.descricao,
            preco: this.produto.preco,
            categoria: this.produto.categoria_id
          });

          // Carregar imagem existente
          if (this.produto.imagemCaminho) {
            this.preview = `http://localhost:8080/uploads/${this.produto.imagemCaminho}`;
          }
        },
        error: (error) => {
          console.error(error);
          this.exibirMensagem('Erro ao carregar o produto.');
        }
      });
    }
  }

  carregarCategorias() {
    this.categoriaService.listarTodas().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
        this.exibirMensagem('Erro ao carregar categorias.');
      }
    });
  }

  public async selecionarImagem() {
    try {
      const result = await Camera.pickImages({
        limit: 1, // Apenas 1 imagem
        quality: 90
      });

      if (result.photos.length > 0) {
        const photo = result.photos[0];
        if (photo.webPath) {
          this.preview = photo.webPath;
        }

        // Converter para File
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        let extension = blob.type.split('/')[1];
        extension = extension.replace('+xml', '');
        this.file = new File([blob], `imagem_${Date.now()}.${extension}`, { type: blob.type });
      }
    } catch (err) {
      console.error("Erro ao selecionar imagem:", err);
      this.exibirMensagem('Erro ao selecionar imagem.');
    }
  }

  removerImagem() {
    this.preview = null;
    this.file = null;
  }

  salvar() {
    if (this.formGroup.invalid) {
      this.exibirMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Obter ID do usuário logado
    const userId = this.authService.getToken();
    if (!userId) {
      this.exibirMensagem('Erro: usuário não autenticado.');
      return;
    }

    // Validar preço
    const precoValue = this.formGroup.value.preco;
    if (!precoValue || precoValue === '' || isNaN(parseFloat(precoValue))) {
      this.exibirMensagem('Por favor, informe um preço válido.');
      return;
    }

    // Criar FormData para enviar imagem
    const formData = new FormData();
    const preco = parseFloat(precoValue);
    
    formData.append('titulo', this.formGroup.value.nome);
    formData.append('descricao', this.formGroup.value.descricao);
    formData.append('telefone', this.formGroup.value.telefone);
    formData.append('preco', preco.toString());
    formData.append('categoria_id', this.formGroup.value.categoria.toString());
    formData.append('status', 'ACTIVE');
    formData.append('usuario_id', userId.toString());

    if (this.file) {
      formData.append('imagem', this.file);
    }

    console.log('=== DEBUG PRODUTO ===');
    console.log('Título:', this.formGroup.value.nome);
    console.log('Preço (valor original):', precoValue);
    console.log('Preço (parseFloat):', preco);
    console.log('Categoria ID:', this.formGroup.value.categoria);
    console.log('Usuario ID:', userId);
    console.log('Tem arquivo de imagem:', !!this.file);
    console.log('FormData entries:');
    formData.forEach((value, key) => {
      console.log(`  ${key}:`, value);
    });
    console.log('====================');
    
    if (this.produto.id) {
      // Atualizar produto existente
      this.produtoService.atualizarComImagem(this.produto.id, formData).subscribe({
        next: () => {
          this.exibirMensagem('Produto atualizado com sucesso!');
          this.router.navigate(['/marketplace']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.exibirMensagem('Erro ao atualizar produto.');
        }
      });
    } else {
      // Criar novo produto
      this.produtoService.criarComImagem(formData).subscribe({
        next: () => {
          this.exibirMensagem('Produto criado com sucesso!');
          this.router.navigate(['/marketplace']);
        },
        error: (erro) => {
          console.error('Erro ao criar:', erro);
          this.exibirMensagem('Erro ao criar produto.');
        }
      });
    }
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  voltar() {
    this.router.navigate(['/marketplace']);
  }
}
