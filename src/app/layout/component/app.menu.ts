import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        // Obtenemos los datos del data.json
        this.dataService.getData().subscribe((data: any) => {
            this.model = [
                {
                    label: 'INICIO',
                    items: [{ label: 'PANEL PRINCIPAL', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
                },
                {
                    label: 'COMPONENTES',
                    items: [
                        // { label: 'DISEÑO DE FORMULARIO', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        // { label: 'ENTRADA', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        // { label: 'BOTONES', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                        { label: 'LISTA DE TRABAJADORES', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/table'] },
                        // { label: 'LISTAS', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                        // { label: 'ARBOL', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                        // { label: 'PANEL', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                        // { label: 'INCRUSTAR', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                        // { label: 'MEDIA', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                        // { label: 'MENU', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                        // { label: 'MENSAJE', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                        // { label: 'ARCHIVOS', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                        // { label: 'ESTADISTICAS', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                        // { label: 'CALENDARIO', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                        // { label: 'VARIADO', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                    ]
                },
                {
                    label: 'PÁGINAS',
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/pages'],
                    items: [
                        {
                            label: 'ADMINISTRACIÓN DE TRABAJADORES',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/pages/crud']
                        },
                        {
                            label: 'LISTA DE TRABAJADORES',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/uikit/table']
                        },
                        {
                            label: 'GRANJAS',
                            icon: 'pi pi-fw pi-user',
                            items: this.crearMenuZonas(data)  // Aquí creamos el menú dinámico para las zonas y kazetas
                        }
                    ]
                },
                

                    // {
                    //     label: 'NO ENCONTRADO',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/pages/notfound']
                    // },
                    // {
                    //     label: 'EMPATADO',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/pages/empty']
                    // }
    //            ]
      //      },
            // {
            //     label: 'JERARQUIA',
            //     items: [
            //         {
            //             label: 'SUBMENU 1',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'SUBMENU 1.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'SUBMENU 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'SUBMENU 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'SUBMENU 1.1.3', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'SUBMENU 1.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'SUBMENU 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'SUBMENU 2',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'SUBMENU 2.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'SUBMENU 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'SUBMENU 2.1.2', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'SUBMENU 2.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'SUBMENU 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         }
            //     ]
            // },
                {
                    label: '¿QUIÉNES SOMOS?',
                    items: [
                        {
                            label: 'DOCUMENTOS',
                            icon: 'pi pi-fw pi-book',
                            routerLink: ['/documentation']
                        },
                        {
                            label: 'MÁS INFORMACIÓN',
                            icon: 'pi pi-fw pi-github',
                            url: 'https://youtu.be/RjOOYjuOYf0?si=ccyMddzZahku9ZWz',
                            target: '_blank'
                        }
                    ]
                }
            ];
        });
    }

    // Función para crear las zonas dinámicamente en el menú
    crearMenuZonas(data: any): MenuItem[] {
        const zonasMenu: MenuItem[] = [];

        // Iteramos por cada zona (dataset de cada zona en promedioAlimento)
        data.promedioAlimento.datasets.forEach((dataset: any, index: number) => {
            const zona = dataset.label; // Z1, Z2, Z3
            const kazetas = data.promedioAlimento.labels; // Las kazetas para la zona (KAZETA 1, KAZETA 2...)

            // Crear el objeto de menú para cada zona
            zonasMenu.push({
                label: zona,
                icon: 'pi pi-fw pi-map-marker', // Icono para la zona (puedes cambiarlo si deseas)
                items: kazetas.map((kazeta: string, kazetaIndex: number) => ({
                    label: `${kazeta}`,  // Mostrar el nombre de la kazeta
                    icon: 'pi pi-fw pi-cog', // Puedes cambiar el icono también
                    routerLink: [`/kazeta/${zona}/${kazetaIndex + 1}`] // Añades el enlace dinámico (por ejemplo: /kazeta/Z1/1)
                }))
            });
        });

        return zonasMenu;
    }
}
