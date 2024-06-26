import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportProfesPageRoutingModule } from './report-profes-routing.module';

import { ReportProfesPage } from './report-profes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReportProfesPageRoutingModule
  ],
  declarations: [ReportProfesPage]
})
export class ReportProfesPageModule {}
