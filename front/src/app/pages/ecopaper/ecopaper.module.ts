import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcopaperPageRoutingModule } from './ecopaper-routing.module';

import { EcopaperPage } from './ecopaper.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EcopaperPageRoutingModule
  ],
  declarations: [EcopaperPage]
})
export class EcopaperPageModule {}
