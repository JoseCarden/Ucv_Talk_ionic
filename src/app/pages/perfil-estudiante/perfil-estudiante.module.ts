import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEstudiantePageRoutingModule } from './perfil-estudiante-routing.module';

import { PerfilEstudiantePage } from './perfil-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PerfilEstudiantePageRoutingModule
  ],
  declarations: [PerfilEstudiantePage]
})
export class PerfilEstudiantePageModule {}
