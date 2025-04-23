import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule, CommonModule],
    template: `<div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">NOTIFICACIONES</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>

        <!-- Renderización dinámica de notificaciones -->
        <span class="block text-muted-color font-medium mb-4">HOY</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let notification of hoy" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-comment text-purple-500 text-3xl"></i> <!-- Cambio de tamaño de icono -->
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">{{ notification.text }}</span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">AYER</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let notification of ayer" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-users text-cyan-500 text-3xl"></i> <!-- Cambio de tamaño de icono -->
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">{{ notification.text }}</span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">SEMANA PASADA</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let notification of semanaPasada" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-arrow-up !text-3xl text-green-500"></i> <!-- Cambio de tamaño de icono -->
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">{{ notification.text }}</span>
            </li>
        </ul>
    </div>`
})
export class NotificationsWidget {
    hoy: any[] = [];
    ayer: any[] = [];
    semanaPasada: any[] = [];
    items = [
        { label: 'AGREGAR', icon: 'pi pi-fw pi-plus' },
        { label: 'REMOVER', icon: 'pi pi-fw pi-trash' }
    ];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.getData().subscribe((data: any) => {
            console.log('Datos cargados desde JSON:', data);
            this.hoy = data.notificaciones.hoy;
            this.ayer = data.notificaciones.ayer;
            this.semanaPasada = data.notificaciones.semanaPasada;
        });
    }
}
