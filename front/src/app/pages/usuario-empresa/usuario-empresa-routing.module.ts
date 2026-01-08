import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioEmpresaPage } from './usuario-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioEmpresaPageRoutingModule {}
