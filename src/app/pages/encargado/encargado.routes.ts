import { Routes } from '@angular/router';
import { EncargadoLayoutComponent } from './layout/component/encargado-layout/encargado-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroAlimentoComponent } from './registro-alimento/registro-alimento.component';
import { RegistroMortalidadComponent } from './registro-mortalidad/registro-mortalidad.component';
import { VistaDatosComponent } from './vista-datos/vista-datos.component';
// importa más vistas si las necesitas

export const encargadoRoutes: Routes = [
  {
    path: '',
    component: EncargadoLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'registro-alimento',
        component: RegistroAlimentoComponent
      },
      {
        path: 'registro-mortalidad',
        component: RegistroMortalidadComponent
      },
      {
        path: 'vista-datos',
        component: VistaDatosComponent
      }
      // ,
      // {
      //   path: 'registro-peso',
      //   loadComponent: () =>
      //     import('./registro-peso/registro-peso.component').then(m => m.RegistroPesoComponent)
      // },
      // {
      //   path: 'registro-consumo',
      //   loadComponent: () =>
      //     import('./registro-consumo/registro-consumo.component').then(m => m.RegistroConsumoComponent)
      // }
    ]
  }
];
