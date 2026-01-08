import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliacaoEmpresaPageRoutingModule } from './avaliacao-empresa-routing.module';

import { AvaliacaoEmpresaPage } from './avaliacao-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliacaoEmpresaPageRoutingModule
  ],
  declarations: [AvaliacaoEmpresaPage]
})
export class AvaliacaoEmpresaPageModule {}
