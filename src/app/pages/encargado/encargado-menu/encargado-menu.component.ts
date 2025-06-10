import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '../../../layout/component/app.menuitem';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-encargado-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  templateUrl: './encargado-menu.component.html',
  styleUrls: ['./encargado-menu.component.scss']
})
export class EncargadoMenuComponent {
  model: MenuItem[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const usuario = data.usuarios.find((u: any) => u.email === user.email);
      const kazetasAsignadas = data.kazetas.filter((k: any) => usuario.kazetasAsignadas?.includes(k.id));

      this.model = [
        {
          label: 'INICIO',
          items: [
            { label: 'PANEL PRINCIPAL', icon: 'pi pi-fw pi-home', routerLink: ['/encargado'] }
          ]
        },
        {
          label: 'OPERACIONES',
          items: [
            {
              label: 'REGISTRO DE ALIMENTO',
              icon: 'pi pi-box',
              routerLink: ['/encargado/registro-alimento']
            },
            {
              label: 'REGISTRO DE MORTALIDAD',
              icon: 'pi pi-times-circle',
              routerLink: ['/encargado/registro-mortalidad']
            },
            {
              label: 'REGISTRO DE PESO',
              icon: 'pi pi-chart-bar',
              routerLink: ['/encargado/registro-peso']
            },
            {
              label: 'REGISTRO DE CONSUMO',
              icon: 'pi pi-chart-bar',
              routerLink: ['/encargado/registro-consumo']
            },
            {
              label: 'VISTA GENERAL',
              icon: 'pi pi-table',
              routerLink: ['/encargado/vista-datos']
            }
          ]
        },
        {
          label: 'AYUDA',
          items: [
            {
              label: 'DOCUMENTACIÓN',
              icon: 'pi pi-fw pi-book',
              url: 'https://github.com/CristianSinoe/PROYECTO_AVICOLA',
              target: '_blank'
            },
            {
              label: 'SOPORTE',
              icon: 'pi pi-fw pi-question-circle',
              url: 'https://github.com/CristianSinoe/PROYECTO_AVICOLA',
              target: '_blank'
            }
          ]
        }
      ];
    });
  }
}
