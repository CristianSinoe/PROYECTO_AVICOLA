// src/app/pages/granjero/granjero.routes.ts
import { Routes } from '@angular/router';
import { GranjeroLayoutComponent } from './layout/component/granjero.layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroKazetaComponent } from './registro-kazeta/registro-kazeta.component';
import { ParvadaComponent } from './parvada/parvada.component';
// importa más vistas si las necesitas...

export const granjeroRoutes: Routes = [
  {
    path: '',
    component: GranjeroLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'registro-kazeta',
        component: RegistroKazetaComponent
      },
      {
        path: 'parvadas',
        component: ParvadaComponent
      }
      // ,
      // {
      //   path: 'notificaciones',
      //   loadComponent: () =>
      //     import('./notificaciones/notificaciones.component').then(m => m.NotificacionesComponent)
      // },
      // {
      //   path: 'ayuda',
      //   loadComponent: () =>
      //     import('./ayuda/ayuda.component').then(m => m.AyudaComponent)
      // }
    ]
  }
];
