import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovidadeDetalhePage } from './novidade-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: NovidadeDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovidadeDetalhePageRoutingModule {}
