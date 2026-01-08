import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcopaperPage } from './ecopaper.page';

const routes: Routes = [
  {
    path: '',
    component: EcopaperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcopaperPageRoutingModule {}
