import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioEmpresaPageRoutingModule } from './usuario-empresa-routing.module';

import { UsuarioEmpresaPage } from './usuario-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioEmpresaPageRoutingModule
  ],
  declarations: [UsuarioEmpresaPage]
})
export class UsuarioEmpresaPageModule {}
