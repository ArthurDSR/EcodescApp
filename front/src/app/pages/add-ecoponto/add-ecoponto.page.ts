import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Ecoponto } from '../../model/ecoponto';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { EcopontoService } from 'src/app/services/ecoponto.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-add-ecoponto',
  templateUrl: './add-ecoponto.page.html',
  styleUrls: ['./add-ecoponto.page.scss'],
  standalone: false
})
export class AddEcopontoPage implements OnInit, AfterViewInit {
  latitude: number;
  longitude: number;
  ecoponto: Ecoponto;
  formGroup: FormGroup;
  searchQuery: string = '';
  searchResults: any[] = [];
  private searchTimeout: any;

  // Propriedades do mapa
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  showMap: boolean = true;

  // Propriedades do dropdown
  showDropdown: boolean = false;
  selectedIndex: number = -1;

  // URL da sua API backend
  private readonly api_url = 'http://localhost:8080/api/v1';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private http: HttpClient,
    private ecopontoService: EcopontoService
  ) {
    this.latitude = 0;
    this.longitude = 0;
    this.ecoponto = new Ecoponto();
    this.formGroup = this.formBuilder.group({
      'nome': [this.ecoponto.nome, Validators.compose([Validators.required])],
      'descricao': [this.ecoponto.descricao, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    // Primeiro obter a localização, depois carregar o mapa
    this.registrarLocalizacao().then(() => {
      this.inicializarMapa();
    }).catch((error: any) => {
      console.error('Erro ao obter localização:', error);
      // Usar localização padrão se falhar (São Paulo)
      this.latitude = -23.5505;
      this.longitude = -46.6333;
      this.inicializarMapa();
    });

    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.ecopontoService.buscarPorId(id).subscribe({
        next: (ecoponto: any) => {
          this.ecoponto = ecoponto;
          this.formGroup.patchValue({
            nome: this.ecoponto.nome,
            descricao: this.ecoponto.descricao
          });

        },
        error: (error) => {
          console.error(error);
          this.exibirMensagem('Erro ao carregar o ecoponto.');
        }
      });
    }
  }

  ngAfterViewInit() {
    // Removido daqui - agora é chamado no ngOnInit após obter localização
  }

  private inicializarMapa() {
    // Configurar ícones do Leaflet primeiro
    this.iconesLeaflet();

    // Aguardar o DOM estar pronto e inicializar mapa
    setTimeout(() => {
      this.criarMapa();
    }, 500);
  }

  registrarLocalizacao(): Promise<void> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000, // Aumentar tempo limite para 10 segundos
        maximumAge: 0 // Desativa o cache, forçando a obtenção de uma nova localização
      })
        .then((retorno) => {
          this.latitude = retorno.coords.latitude;
          this.longitude = retorno.coords.longitude;
          console.log('Localização obtida:', this.latitude, this.longitude);
          resolve();
        })
        .catch((erro) => {
          console.error('Erro ao obter localização:', erro);
          reject(erro);
        });
    });
  }

  private criarMapa() {
    const mapElement = document.getElementById('map');

    if (this.map) {
      this.map.remove();
    }

    try {
      // Criar mapa centrado na localização do usuário
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Adicionar marcador da localização atual do usuário
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: '<div style="background-color: #007bff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker([this.latitude, this.longitude], { icon: userIcon })
        .bindPopup('Sua localização atual')
        .addTo(this.map);

      setTimeout(() => {
        if (this.ecoponto && this.ecoponto.coordenadas) {
          this.aplicarCoordenadasNoMapa();
        }

        // Forçar redimensionamento final
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 200);

    } catch (error) {
      console.error('Erro ao criar mapa:', error);
    }
  }

  private iconesLeaflet() {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }

  private aplicarCoordenadasNoMapa() {
    if (this.ecoponto && this.ecoponto.coordenadas && this.map) {
      const coords = this.ecoponto.coordenadas.split(',');
      if (coords.length === 2) {
        const lat = parseFloat(coords[0].trim());
        const lon = parseFloat(coords[1].trim());
        if (!isNaN(lat) && !isNaN(lon)) {
          this.updateMapLocation(lat, lon);
        }
      }
    }
  }

  onSearchFocus() {
    this.showDropdown = true;
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onSearchInput(event: any) {
    const query = event.detail.value;
    this.searchQuery = query;
    this.selectedIndex = -1;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Se a query for muito curta, limpar resultados
    if (query.length < 3) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }

    // Mostrar dropdown
    this.showDropdown = true;

    // Aguardar 500ms antes de fazer a pesquisa para evitar muitas requisições
    this.searchTimeout = setTimeout(() => {
      this.searchLocation(query);
    }, 500);
  }

  searchLocation(query: string) {
    // Chamar sua API backend em vez do Nominatim diretamente
    const url = `${this.api_url}/ecoponto/search-location`;
    const params = {
      query: query,
      limit: '5',
      email: 'andreyzacariascarvalho@gmail.com'
    };


    this.http.get<any[]>(url, { params }).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.showDropdown = results.length > 0;
      },
      error: (error) => {
        console.error('Erro ao buscar localização:', error);
        this.searchResults = [];
        this.showDropdown = false;
        this.exibirMensagem('Erro ao buscar localização. Verifique sua conexão.');
      }
    });
  }

  selecionarLocalizacao(result: any) {
    this.formGroup.patchValue({
      descricao: result.displayName || result.display_name
    });

    this.ecoponto.coordenadas = `${result.lat}, ${result.lon}`;

    this.searchResults = [];
    this.showDropdown = false;
    this.searchQuery = result.displayName || result.display_name;

    this.updateMapLocation(
      parseFloat(result.lat),
      parseFloat(result.lon)
    );

  }

  private updateMapLocation(lat: number, lon: number) {
    if (this.map) {

      //logica de redimensionamento
      this.map.invalidateSize();

      this.map.setView([lat, lon], 15);

      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = undefined;
      }
      try {
        this.marker = L.marker([lat, lon])
          .addTo(this.map);
        ('Marcador adicionado com sucesso');
      } catch (error) {
        ('Usando ícone customizado como fallback');
        this.marker = L.marker([lat, lon])
          .addTo(this.map);
      }

      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 100);

    } else {
      console.error('Mapa não está disponível para atualização');
    }
  }

  public salvarEcoponto() {
    if (this.formGroup.invalid) {
      this.exibirMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.ecoponto.coordenadas) {
      this.exibirMensagem('Por favor, selecione uma localização no mapa.');
      return;
    }

    let ecoponto = new Ecoponto();
    ecoponto.nome = this.formGroup.value.nome;
    ecoponto.coordenadas = this.ecoponto.coordenadas;
    ecoponto.descricao = this.formGroup.value.descricao;

    //parte de edicao
    if (this.ecoponto.id) {
      ecoponto.id = this.ecoponto.id;
      this.ecopontoService.atualizar(ecoponto).subscribe({
        next: () => {
          this.exibirMensagem('Ecoponto salvo com sucesso!!!')
        },
        error: (err) => {
          console.error(err);
          this.exibirMensagem('Erro ao salvar o ecoponto.');
        }
      });
    } else {

      this.ecopontoService.salvar(ecoponto).subscribe({
        next: () => {
          this.exibirMensagem('Ecoponto salvo com sucesso!!!')
        },
        error: (err) => {
          console.error(err);
          this.exibirMensagem('Erro ao salvar o ecoponto.');
        }
      });
    }

    this.router.navigate(['/ecoponto'], { replaceUrl: true });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  public limpar() {
    this.formGroup.reset();
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
    this.selectedIndex = -1;

    this.ecoponto.coordenadas = '';

    if (this.marker && this.map) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }

    if (this.map) {
      this.map.setView([this.latitude, this.longitude], 10);
    }

    this.formGroup.patchValue({
      nome: '',
      descricao: ''
    });

    ('Campos do formulário foram limpos.');
  }

  public voltar() {
    this.router.navigate(['/ecoponto'], { replaceUrl: true });
  }

}
