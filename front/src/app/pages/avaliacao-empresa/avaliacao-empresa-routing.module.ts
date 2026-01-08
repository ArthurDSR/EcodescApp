import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoEmpresaPage } from './avaliacao-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacaoEmpresaPageRoutingModule {}
