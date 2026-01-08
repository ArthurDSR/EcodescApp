import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioComumPageRoutingModule } from './usuario-comum-routing.module';

import { UsuarioComumPage } from './usuario-comum.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsuarioComumPageRoutingModule
  ],
  declarations: [UsuarioComumPage]
})
export class UsuarioComumPageModule {}
