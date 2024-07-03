import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilEstudiantePage } from './perfil-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEstudiantePageRoutingModule {}
