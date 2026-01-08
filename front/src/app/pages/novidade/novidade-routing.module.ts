import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovidadePage } from './novidade.page';

const routes: Routes = [
  {
    path: '',
    component: NovidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovidadePageRoutingModule {}
