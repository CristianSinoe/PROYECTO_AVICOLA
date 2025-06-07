import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/guards/auth.guard';
import { KazetaDetailComponent } from './app/pages/kazeta-detail/kazeta-detail.component';
import { ParvadaDetailComponent } from './app/pages/parvada/parvada-detail/parvada-detail.component';
import { RedirectComponent } from './app/pages/redirect/redirect.component'; // 👈 nuevo import

export const appRoutes: Routes = [
  // 👇 redireccionamiento dinámico desde /
  {
    path: '',
    component: RedirectComponent
  },

  // Rutas para administradores
  {
    path: 'admin-area',
    component: AppLayout,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', component: Dashboard },
      { path: 'kazeta/:zona/:kazetaIndex', component: KazetaDetailComponent },
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
        path: 'kazeta/:zona/:parvada/:kazetaNombre',
        loadComponent: () =>
          import('./app/pages/kazeta-detail/kazeta-detail.component').then(m => m.KazetaDetailComponent)
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
      }
    ]
  },

  // Rutas exclusivas para granjeros
  {
    path: 'granjero',
    component: AppLayout,
    canActivate: [AuthGuard],
    data: { roles: ['granjero'] },
    loadChildren: () =>
      import('./app/pages/granjero/granjero.routes').then(m => m.granjeroRoutes)
  },

  // Rutas públicas y otras rutas protegidas
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./app/pages/admin/admin.routes').then(m => m.default),
    data: { roles: ['admin'] }
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
