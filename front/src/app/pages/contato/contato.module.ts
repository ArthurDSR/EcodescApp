import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContatoPageRoutingModule } from './contato-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ContatoPage } from './contato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContatoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContatoPage]
})
export class ContatoPageModule {}
