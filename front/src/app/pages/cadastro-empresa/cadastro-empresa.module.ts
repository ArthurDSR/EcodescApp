import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroEmpresaPageRoutingModule } from './cadastro-empresa-routing.module';

import { CadastroEmpresaPage } from './cadastro-empresa.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroEmpresaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CadastroEmpresaPage]
})
export class CadastroEmpresaPageModule {}
