import { Routes } from '@angular/router';
import { EncargadoLayoutComponent } from './layout/component/encargado-layout/encargado-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroAlimentoComponent } from './registro-alimento/registro-alimento.component';
import { RegistroMortalidadComponent } from './registro-mortalidad/registro-mortalidad.component';
import { VistaDatosComponent } from './vista-datos/vista-datos.component';
import { RegistroPesoComponent } from './registro-peso/registro-peso.component';
import { RegistroConsumoComponent } from './registro-consumo/registro-consumo.component';


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
      },
      {
        path: 'registro-peso',
        component:RegistroPesoComponent
      },
      {
        path: 'registro-consumo',
        component:RegistroConsumoComponent
      }
    ]
  }
];
