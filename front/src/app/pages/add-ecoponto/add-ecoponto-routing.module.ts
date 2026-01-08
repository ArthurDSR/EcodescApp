import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEcopontoPage } from './add-ecoponto.page';

const routes: Routes = [
  {
    path: '',
    component: AddEcopontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEcopontoPageRoutingModule {}
