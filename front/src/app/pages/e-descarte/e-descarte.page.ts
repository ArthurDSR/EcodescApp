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
  selector: 'app-e-descarte',
  templateUrl: './e-descarte.page.html',
  styleUrls: ['./e-descarte.page.scss'],
  standalone: false
})
export class EDescartePage implements OnInit {

  latitude: number;
  longitude: number;
  ecopontos: Ecoponto[];

  private map: L.Map | undefined;
  private markers: L.Marker[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private http: HttpClient,
    private ecopontoService: EcopontoService) {

    this.latitude = 0;
    this.longitude = 0;
    this.ecopontos = [];
  }

  ngOnInit() {
    // Primeiro obter a localização, depois carregar o mapa
    this.registrarLocalizacao().then(() => {
      this.carregarEcopontos();
    }).catch((error: any) => {
      console.error('Erro ao obter localização:', error);
      // Usar localização padrão se falhar (São Paulo)
      this.latitude = -23.5505;
      this.longitude = -46.6333;
      this.carregarEcopontos();
    });
  }

  private carregarEcopontos() {
    // Carregar ecopontos após obter localização
    this.ecopontoService.listarTodos().subscribe({
      next: (ecopontos) => {
        this.ecopontos = ecopontos;

        // Configurar ícones do Leaflet primeiro
        this.setupLeafletIcons();

        // Aguardar o DOM estar pronto e inicializar mapa
        setTimeout(() => {
          this.createMap();
        }, 500);

        if (this.map) {
          this.addMarkersToMap();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar ecopontos:', err);
      }
    });
  }



  registrarLocalizacao(): Promise<void> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // Tenta obter a localização mais precisa possível
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



  private createMap() {
    try {
      this.clearMarkers();

      // Criar mapa centrado na localização do usuário com zoom maior
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

      // Adicionar marcadores dos ecopontos
      setTimeout(() => {
        this.addMarkersToMap();

        // Forçar redimensionamento final
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 200);

    } catch (error) {
      console.error('Erro ao criar mapa:', error);
    }
  }


  private setupLeafletIcons() {
    // Corrigir problema de ícones do Leaflet usando CDN
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }

  private addMarkersToMap() {
    // Limpar marcadores existentes
    this.clearMarkers();


    // Adicionar um marcador para cada ecoponto
    this.ecopontos.forEach((ecoponto, index) => {
      if (ecoponto.coordenadas) {
        const coords = ecoponto.coordenadas.split(',');
        if (coords.length === 2) {
          const lat = parseFloat(coords[0].trim());
          const lon = parseFloat(coords[1].trim());

          if (!isNaN(lat) && !isNaN(lon)) {
            try {
              const popupBtnId = `popup-btn-${index}`;

              const marker = L.marker([lat, lon])
                .bindPopup(`
                  <div>
                    <h3>${ecoponto.nome}</h3>
                    <p id="${popupBtnId}" type="button"
                       style="margin:8px 0 0; padding:10px 14px; background:#003554; color:#fff; border-radius:8px; text-align:center; cursor:pointer;">
                      Ir para Maps
                    </p>
                  </div>
                `)
                .addTo(this.map!);

              this.markers.push(marker);
              marker.on('popupopen', () => {
                const btn = document.getElementById(popupBtnId);
                if (btn) {
                  btn.addEventListener('click', (ev) => {
                    L.DomEvent.stopPropagation(ev);
                    this.abrirRota(lat, lon);
                    console.log('clicou no popup');
                  });
                }
              });
            } catch (error) {
              console.error('Erro ao adicionar marcador:', error);
            }
          }
        }
      }
    });
  }

  private clearMarkers() {
    this.markers.forEach(marker => {
      if (this.map) {
        this.map.removeLayer(marker);
      }
    });
    this.markers = [];
  }


  abrirRota(destLat: number, destLng: number): void {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${this.latitude},${this.longitude}&destination=${destLat},${destLng}`,
      "_blank"
    );
  }
}
