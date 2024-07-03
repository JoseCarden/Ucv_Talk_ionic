import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabEstuPage } from './tab-estu.page';

const routes: Routes = [
  {
    path: '',
    component: TabEstuPage,
      
    children: [
      {
        path: 'seleccion-chat',
        loadChildren: () => import('../seleccion-chat_A/seleccion-chat.module').then( m => m.SeleccionChatPageModule)
      },
      {
        path: 'report-estu',
        loadChildren: () => import('../report-estu/report-estu.module').then( m => m.ReportEstuPageModule)
      },
      {
        path: 'perfil-estudiante',
        loadChildren: () => import('../perfil-estudiante/perfil-estudiante.module').then( m => m.PerfilEstudiantePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabEstuPageRoutingModule {}
