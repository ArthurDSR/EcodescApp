import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovidadeDetalhePageRoutingModule } from './novidade-detalhe-routing.module';

import { NovidadeDetalhePage } from './novidade-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovidadeDetalhePageRoutingModule
  ],
  declarations: [NovidadeDetalhePage]
})
export class NovidadeDetalhePageModule {}
