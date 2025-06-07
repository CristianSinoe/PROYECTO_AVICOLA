import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { AuthGuard } from '../../guards/auth.guard';

export default [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'access',
        component: Access,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'medico', 'granjero', 'encargado'] }
    },
    {
        path: 'error',
        component: Error
    }
] as Routes;
