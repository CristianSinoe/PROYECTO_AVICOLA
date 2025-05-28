// src/app/pages/granjero/granjero.routes.ts
import { Routes } from '@angular/router';
import { AppLayout } from '../../layout/component/app.layout';
import { DashboardComponent } from './dashboard/dashboard.component';

export const granjeroRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    data: { roles: ['granjero'] }, 
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];

