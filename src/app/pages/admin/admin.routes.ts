import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard';
import { AppLayout } from '../../layout/component/app.layout';
import { LayoutService } from '../../layout/service/layout.service';

export default [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                component: AdminDashboard,
                data: { roles: ['admin'] }
            }
        ]
    }
] as Routes;
