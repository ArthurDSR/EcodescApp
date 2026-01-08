import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovidadePageRoutingModule } from './novidade-routing.module';

import { NovidadePage } from './novidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovidadePageRoutingModule
  ],
  declarations: [NovidadePage]
})
export class NovidadePageModule {}
