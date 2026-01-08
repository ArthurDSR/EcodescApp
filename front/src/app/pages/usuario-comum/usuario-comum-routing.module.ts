import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComumPage } from './usuario-comum.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioComumPageRoutingModule {}
