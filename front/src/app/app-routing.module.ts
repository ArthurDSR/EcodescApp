import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'avaliacao-empresa',
    loadChildren: () => import('./pages/avaliacao-empresa/avaliacao-empresa.module').then( m => m.AvaliacaoEmpresaPageModule)
  },
  {
    path: 'e-descarte',
    loadChildren: () => import('./pages/e-descarte/e-descarte.module').then( m => m.EDescartePageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./pages/contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./pages/cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'cadastro-empresa',
    loadChildren: () => import('./pages/cadastro-empresa/cadastro-empresa.module').then( m => m.CadastroEmpresaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ecopaper',
    loadChildren: () => import('./pages/ecopaper/ecopaper.module').then( m => m.EcopaperPageModule)
  },
  {
    path: 'novidade',
    loadChildren: () => import('./pages/novidade/novidade.module').then( m => m.NovidadePageModule)
  },
  {
    path: 'add-novidade',
    loadChildren: () => import('./pages/add-novidade/add-novidade.module').then( m => m.AddNovidadePageModule)
  },
  {
    path: 'ecoponto',
    loadChildren: () => import('./pages/ecoponto/ecoponto.module').then( m => m.EcopontoPageModule)
  },
  {
    path: 'add-ecoponto',
    loadChildren: () => import('./pages/add-ecoponto/add-ecoponto.module').then( m => m.AddEcopontoPageModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./pages/marketplace/marketplace.module').then( m => m.MarketplacePageModule)
  },
  {
    path: 'usuario-comum',
    loadChildren: () => import('./pages/usuario-comum/usuario-comum.module').then( m => m.UsuarioComumPageModule)
  },
  {
    path: 'usuario-empresa',
    loadChildren: () => import('./pages/usuario-empresa/usuario-empresa.module').then( m => m.UsuarioEmpresaPageModule)
  },
  {
    path: 'superadmin',
    loadChildren: () => import('./pages/superadmin/superadmin.module').then( m => m.SuperadminPageModule)
  },
  {
    path: 'novidade-detalhe',
    loadChildren: () => import('./pages/novidade-detalhe/novidade-detalhe.module').then( m => m.NovidadeDetalhePageModule)
  },
  {
    path: 'avaliacoes',
    loadChildren: () => import('./pages/avaliacoes/avaliacoes.module').then( m => m.AvaliacoesPageModule)
  },
  {
    path: 'avaliacoes/:idEmpresa',
    loadChildren: () => import('./pages/avaliacoes/avaliacoes.module').then( m => m.AvaliacoesPageModule)
  },
  {
    path: 'chatbot',
    loadChildren: () => import('./pages/chatbot/chatbot.module').then( m => m.ChatbotPageModule)
  },
  {
    path: 'produto-detalhe/:id',
    loadChildren: () => import('./pages/produto-detalhe/produto-detalhe.module').then( m => m.ProdutoDetalhePageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'add-produto',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('./pages/empresas/empresas.module').then( m => m.EmpresasPageModule),
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
