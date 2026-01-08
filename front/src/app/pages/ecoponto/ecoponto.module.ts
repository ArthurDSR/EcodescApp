import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcopontoPageRoutingModule } from './ecoponto-routing.module';

import { EcopontoPage } from './ecoponto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcopontoPageRoutingModule
  ],
  declarations: [EcopontoPage]
})
export class EcopontoPageModule {}
