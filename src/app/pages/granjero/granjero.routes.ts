// src/app/pages/granjero/granjero.routes.ts
import { Routes } from '@angular/router';
import { AppLayout } from '../../layout/component/app.layout';
import { Dashboard } from './dashboard/dashboard.component';

export const granjeroRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    data: { roles: ['granjero'] },  // Opcional: roles permitidos para esta ruta
    children: [
      { path: '', component: Dashboard } // Usa dashboard general, luego filtras menú para granjero
    ]
  }
];

