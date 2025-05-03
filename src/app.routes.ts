import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/guards/auth.guard';
import { KazetaDetailComponent } from './app/pages/kazeta-detail/kazeta-detail.component';

export const appRoutes: Routes = [
  {
      path: '',
      component: AppLayout,
      canActivate: [AuthGuard], // Asegúrate de que el guard está aplicado aquí
      data: { roles: ['admin'] },
      children: [
          { path: '', component: Dashboard },
          { path: 'kazeta/:zona/:kazetaIndex', component: KazetaDetailComponent },
          { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
          { path: 'documentation', component: Documentation },
          { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
      ]
  },
  {
      path: 'admin',
      canActivate: [AuthGuard], // Asegúrate de aplicar el guard aquí también
      loadChildren: () => import('./app/pages/admin/admin.routes').then(m => m.default)
  },
  { path: 'landing', component: Landing },
  { path: 'notfound', component: Notfound },
  {
      path: 'auth',
      loadChildren: () => import('./app/pages/auth/auth.routes').then(m => m.default)
  },
  { path: '**', redirectTo: '/notfound' }
];