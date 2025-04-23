import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';

export default [
    { path: 'ACCESOS', component: Access },
    { path: 'ERROR', component: Error },
    { path: 'INICIO DE SESION', component: Login }
] as Routes;
