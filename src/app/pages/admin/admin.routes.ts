import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard';

export default [
    {
        path: '',
        component: AdminDashboard,
        data: { roles: ['admin'] }
    }
] as Routes;
