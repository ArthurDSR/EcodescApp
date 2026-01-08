import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {NavigationCancel, NavigationEnd, Router, Event} from '@angular/router';
import { AuthService } from './services/auth.service'; // Importe o AuthService
import { Observable } from 'rxjs';

// Interface para definir a estrutura de um item de menu
interface MenuItem {
  label: string;
  route: string;
  roles: string[]; // Papéis que podem ver este item. Se vazio, todos veem.
  icon?: string;
}

interface TabItem {
  tab: string;
  label: string;
  route: string;
  roles: string[]; // Papéis que podem ver este item. Se vazio, todos veem.
  icon?: string;
}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public visibleMenuItems: MenuItem[] = [];
  public visibleTabItems: TabItem[] = [];
  public showFab: boolean = true;
  public showLogo: boolean = true;
  public showBackButton: boolean = false;
  public pageTitle: string = '';

  // Lista mestre com TODOS os itens de menu possíveis
  private allMenuItems: MenuItem[] = [
    { label: 'Início', route: '/inicio', roles: [] }, // Vazio = público
    { label: 'Avalie empresas', route: '/avaliacao-empresa', roles: ['USER', 'BUSINESS', 'ADMIN'] },
    { label: 'E-descarte', route: '/e-descarte', roles: [] },
    { label: 'Entre em contato', route: '/contato', roles: [] },
    { label: 'Seja um parceiro', route: '/cadastro-empresa', roles: [] },
    { label: 'Buscar artigos', route: '/ecopaper', roles: [] },
    { label: 'Gerenciar novidades', route: '/novidade', roles: ['ADMIN'] }, // Apenas ADMIN
    { label: 'Gerenciar ecopontos', route: '/ecoponto', roles: ['ADMIN'] }, // Apenas ADMIN
    { label: 'Gerenciar usuários', route: '/usuarios', roles: ['ADMIN'] }, // Apenas ADMIN
    { label: 'Marketplace', route: '/marketplace', roles: ['USER', 'ADMIN'] },
    { label: 'Perfil', route: '/usuario-comum', roles: ['USER', 'ADMIN'] },
    { label: 'Chats', route: '/chats', roles: ['USER'] },
  ];

  private allTabItems: TabItem[] = [
    { tab: 'avaliacao-empresa', label: 'Avalie empresas', route: '/avaliacao-empresa', roles: ['USER', 'ADMIN'], icon: 'star-half' },
    { tab: 'e-descarte', label: 'E-descarte', route: '/e-descarte', roles: ['USER'], icon: 'compass' },
    { tab: 'inicio',  label: 'Início', route: '/inicio', roles: ['USER', 'BUSINESS', 'ADMIN'], icon: 'home' },
    { tab: 'novidade', label: 'Ger. novidades', route: '/novidade', roles: ['ADMIN'], icon: 'newspaper' }, // Apenas ADMIN
    { tab: 'ecoponto', label: 'Ger. ecopontos', route: '/ecoponto', roles: ['ADMIN'] , icon: 'location' }, // Apenas ADMIN
    { tab: 'marketplace', label: 'Marketplace', route: '/marketplace', roles: ['USER', 'BUSINESS'], icon: 'cart' },
    { tab: 'perfil', label: 'Perfil', route: '/usuario-comum', roles: ['USER'], icon: 'person' },
  ];

  constructor(
    private menuController: MenuController,
    private router: Router,
    private authService: AuthService // Injete o AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.router.events.subscribe((event: Event) => {
      // Este código vai imprimir cada passo do processo de navegação no console.

      // Nós estamos interessados em saber se a navegação foi CANCELADA.
      if (event instanceof NavigationCancel) {
        console.log('--- NAVEGAÇÃO CANCELADA! ---');
        console.log('Motivo do cancelamento:', event);
      }

      // Atualizar visibilidade do FAB após cada navegação
      if (event instanceof NavigationEnd) {
        this.updateFabVisibility();
        this.updatePageHeader(event.url);
      }
    });

  }

  ngOnInit() {
    // Escuta as mudanças no estado de login para atualizar o menu
    this.isLoggedIn$.subscribe(() => {
      this.updateMenuItems();
      this.updateTabItems();
      this.updateLogoVisibility();
      this.updateFabVisibility(); // Atualizar FAB quando o estado de login mudar
    });
  }

  updateMenuItems() {
    const userRole = this.authService.getUserRole();
    if (!userRole) { // Usuário deslogado
      this.visibleMenuItems = this.allMenuItems.filter(item => item.roles.length === 0);
    } else { // Usuário logado
      this.visibleMenuItems = this.allMenuItems.filter(item =>
        item.roles.length === 0 || item.roles.includes(userRole)
      );
    }
  }

  updateTabItems() {
    const userRole = this.authService.getUserRole();
    if (!userRole) { // Usuário deslogado
      this.visibleTabItems = this.allTabItems.filter(item => item.roles.length === 0);
    } else { // Usuário logado
      this.visibleTabItems = this.allTabItems.filter(item =>
        item.roles.length === 0 || item.roles.includes(userRole)
      );
    }
  }

  updateFabVisibility() {
    const userRole = this.authService.getUserRole();
    const isLoggedIn = userRole !== null; // Se tem role, está logado
    const currentUrl = this.router.url;
    
    // FAB só aparece se estiver logado E não estiver nas páginas específicas
    this.showFab = isLoggedIn && !(
      currentUrl.includes('/chatbot') ||
      currentUrl.includes('/login') ||
      currentUrl.includes('/cadastro-usuario') ||
      currentUrl.includes('/cadastro-empresa') ||
      currentUrl.includes('/chat-anuncio') ||
      currentUrl.includes('/produto-detalhe') ||
      currentUrl.includes('/marketplace') ||
      currentUrl.includes('/add-produto')
    );
  }

  updateLogoVisibility() {
    const currentUrl = this.router.url;
    // Logo só aparece se não estiver nas páginas específicas
    this.showLogo = (
      currentUrl.includes('/login') ||
      currentUrl.includes('/cadastro-usuario') ||
      currentUrl.includes('/cadastro-empresa')||
      currentUrl.includes('/inicio')
    );

  }




  async navigateAndCloseMenu(route: string) {
    await this.menuController.close();
    this.router.navigate([route], { replaceUrl: true });
  }

  async navigateToTab(route: string) {
    this.router.navigate([route], { replaceUrl: true });
  }

  async logout() {
    await this.menuController.close();
    this.authService.logout();
  }

  updatePageHeader(url: string) {
    // Não mostrar botão voltar nas páginas especiais (início, login, cadastros)
    const hideBackButtonPages = ['/inicio', '/login', '/cadastro-usuario', '/cadastro-empresa'];
    this.showBackButton = !hideBackButtonPages.some(page => url.includes(page));
    
    this.showLogo = hideBackButtonPages.some(page => url.includes(page));

    const pageTitles: { [key: string]: string } = {
      '/avaliacao-empresa': 'Avalie Empresas',
      '/e-descarte': 'E-descarte',
      '/contato': 'Entre em Contato',
      '/cadastro-empresa': 'Seja um Parceiro',
      '/cadastro-usuario': 'Cadastro',
      '/ecopaper': 'Buscar Artigos',
      '/novidade': 'Gerenciar Novidades',
      '/add-novidade': 'Gerenciar Ecopontos',
      '/ecoponto': 'Gerenciar Ecopontos',
      '/add-ecoponto': 'Adicionar Ecopontos',
      '/marketplace': 'Marketplace',
      '/usuario-comum': 'Perfil',
      '/chatbot': 'Chatbot',
      '/login': 'Login',
      '/produto-detalhe': 'Detalhes do Produto',
      '/avaliacoes': 'Avaliações',
      '/chat-anuncio': 'Chat do Anúncio',
      '/add-produto':'Adicionar Produto'
    };

    // Atualizar título da página
    for (const route in pageTitles) {
      if (url.includes(route)) {
        this.pageTitle = pageTitles[route];
        return;
      }
    }
    this.pageTitle = '';
  }

  goBack() {
    const currentUrl = this.router.url;
    
    // Mapeamento de rotas para onde voltar
    const navigationMap: { [key: string]: string } = {
      '/produto-detalhe': '/marketplace',
      '/add-novidade': '/novidade',
      '/add-ecoponto': '/ecoponto',
      '/avaliacoes': '/avaliacao-empresa',
      '/chatbot': '/inicio',
      '/ecopaper': '/inicio',
      '/contato': '/inicio',
      '/usuario-comum': '/inicio',
      '/usuario-empresa': '/inicio',
      '/marketplace': '/inicio',
      '/add-produto': '/marketplace'
    };

    // Procurar correspondência no mapa
    for (const route in navigationMap) {
      if (currentUrl.includes(route)) {
        this.router.navigate([navigationMap[route]]);
        return;
      }
    }

    // Se não encontrou correspondência, voltar para início
    this.router.navigate(['/inicio']);
  }
}
