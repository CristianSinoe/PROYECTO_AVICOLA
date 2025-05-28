import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/guards/auth.guard';
import { KazetaDetailComponent } from './app/pages/kazeta-detail/kazeta-detail.component';
import { ParvadaDetailComponent } from './app/pages/parvada/parvada-detail/parvada-detail.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }, // Solo admin puede acceder a estas rutas
    children: [
      { path: '', component: Dashboard },
      { path: 'kazeta/:zona/:kazetaIndex', component: KazetaDetailComponent },
      {
        path: 'granjero',
        loadChildren: () =>
          import('./app/pages/granjero/granjero.routes').then(m => m.granjeroRoutes),
        canActivate: [AuthGuard],
        data: { roles: ['granjero'] } // Solo granjeros pueden acceder
      },
      {
        path: 'zona/:zona',
        loadComponent: () =>
          import('./app/pages/zonas/zona-dashboard.component').then(m => m.ZonaDashboardComponent)
      },
      {
        path: 'parvada/:zona',
        loadComponent: () =>
          import('./app/pages/parvada/dashboard/parvada-dashboard.component').then(m => m.ParvadaDashboardComponent)
      },
      {
        path: 'parvada/:zona/:parvada',
        loadComponent: () =>
          import('./app/pages/parvada/parvada-detail/parvada-detail.component').then(m => m.ParvadaDetailComponent)
      },
      { 
        path: 'uikit', 
        loadChildren: () => import('./app/pages/uikit/uikit.routes') 
      },
      { 
        path: 'documentation', 
        component: Documentation 
      },
      { 
        path: 'pages', 
        loadChildren: () => import('./app/pages/pages.routes') 
      },
      {
        path: 'kazeta/:zona/:parvada/:kazetaNombre',
        loadComponent: () =>
          import('./app/pages/kazeta-detail/kazeta-detail.component').then(m => m.KazetaDetailComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./app/pages/admin/admin.routes').then(m => m.default),
    data: { roles: ['admin'] } // Solo admins
  },
  {
    path: 'landing',
    component: Landing
  },
  {
    path: 'notfound',
    component: Notfound
  },
  {
    path: 'auth',
    loadChildren: () => import('./app/pages/auth/auth.routes').then(m => m.default)
  },
  {
    path: '**',
    redirectTo: '/notfound'
  }
];
