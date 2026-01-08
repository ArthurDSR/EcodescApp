import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcopontoPage } from './ecoponto.page';

const routes: Routes = [
  {
    path: '',
    component: EcopontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcopontoPageRoutingModule {}
