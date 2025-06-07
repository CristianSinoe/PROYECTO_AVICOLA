import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getMenuItems(): MenuItem[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user.role;

    const menus: { [key: string]: MenuItem[] } = {
      admin: [
        {
          label: 'Panel de Control',
          icon: 'pi pi-home',
          routerLink: ['/admin']
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-users',
          routerLink: ['/admin/usuarios']
        },
        {
          label: 'Zonas',
          icon: 'pi pi-map',
          routerLink: ['/admin/zonas']
        }
      ],
      granjero: [
        {
          label: 'Panel Principal',
          icon: 'pi pi-home',
          routerLink: ['/granjero']
        },
        {
          label: 'Kazetas',
          icon: 'pi pi-folder',
          routerLink: ['/granjero/registro-kazeta']
        },
        {
          label: 'Parvadas',
          icon: 'pi pi-inbox',
          routerLink: ['/granjero/parvadas']
        },
        {
          label: 'Notificaciones',
          icon: 'pi pi-bell',
          routerLink: ['/granjero/notificaciones']
        }
      ],
      encargado: [
        {
          label: 'Panel Encargado',
          icon: 'pi pi-home',
          routerLink: ['/encargado']
        },
        {
          label: 'Reportes',
          icon: 'pi pi-chart-line',
          routerLink: ['/encargado/reportes']
        },
        {
          label: 'Alertas',
          icon: 'pi pi-exclamation-triangle',
          routerLink: ['/encargado/alertas']
        }
      ]
    };

    return menus[role] || [
      {
        label: 'Sin acceso',
        icon: 'pi pi-ban',
        routerLink: ['/notfound']
      }
    ];
  }
}
