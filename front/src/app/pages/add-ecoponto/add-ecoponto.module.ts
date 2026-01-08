import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEcopontoPageRoutingModule } from './add-ecoponto-routing.module';

import { AddEcopontoPage } from './add-ecoponto.page';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEcopontoPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AddEcopontoPage]
})
export class AddEcopontoPageModule {}
