import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNovidadePageRoutingModule } from './add-novidade-routing.module';

import { AddNovidadePage } from './add-novidade.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddNovidadePageRoutingModule
  ],
  declarations: [AddNovidadePage]
})
export class AddNovidadePageModule {}
