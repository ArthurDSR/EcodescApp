import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EDescartePageRoutingModule } from './e-descarte-routing.module';

import { EDescartePage } from './e-descarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EDescartePageRoutingModule
  ],
  declarations: [EDescartePage]
})
export class EDescartePageModule {}
