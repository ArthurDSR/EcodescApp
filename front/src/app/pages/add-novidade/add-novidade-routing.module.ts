import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNovidadePage } from './add-novidade.page';

const routes: Routes = [
  {
    path: '',
    component: AddNovidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNovidadePageRoutingModule {}
