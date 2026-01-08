import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProdutoPageRoutingModule } from './add-produto-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AddProdutoPage } from './add-produto.page';
import { PhoneMaskDirective } from 'src/app/directives/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddProdutoPageRoutingModule,
    PhoneMaskDirective
  ],
  declarations: [AddProdutoPage]
})
export class AddProdutoPageModule {}
