import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule, CommonModule],
    template: `<div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">NOTIFICACIONES</div>
            <!-- <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div> -->
        </div>

        <span class="block text-muted-color font-medium mb-4">HOY</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let notification of hoy" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-comment text-purple-500 text-3xl"></i>
                </div>
                <div class="flex justify-between items-center w-full">
                    <div class="text-surface-900 dark:text-surface-0 leading-normal">{{ notification.text }}</div>
                    <div class="text-surface-500 text-base ml-4 whitespace-nowrap">{{ notification.fechaHora }}</div>
                </div>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">AYER</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let notification of ayer" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-comment text-purple-500 text-3xl"></i>
                </div>
                <div class="flex justify-between items-center w-full">
                    <div class="text-surface-900 dark:text-surface-0 leading-normal">{{ notification.text }}</div>
                    <div class="text-surface-500 text-base ml-4 whitespace-nowrap">{{ notification.fechaHora }}</div>
                </div>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">SEMANA PASADA</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li *ngFor="let notification of semanaPasada" class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-comment text-purple-500 text-3xl"></i>
                </div>
                <div class="flex justify-between items-center w-full">
                    <div class="text-surface-900 dark:text-surface-0 leading-normal">{{ notification.text }}</div>
                    <div class="text-surface-500 text-base ml-4 whitespace-nowrap">{{ notification.fechaHora }}</div>
                </div>
            </li>
        </ul>
    </div>
    `
})
export class NotificationsWidget implements OnInit {
    notificaciones: any[] = [];
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
    
            this.notificaciones = [
                ...data.notificaciones.hoy,
                ...data.notificaciones.ayer,
                ...data.notificaciones.semanaPasada
            ].map(notification => {
                const fecha = new Date(notification.fechaHora);
                const dia = String(fecha.getDate()).padStart(2, '0');
                const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                const anio = fecha.getFullYear();
                const horas = String(fecha.getHours()).padStart(2, '0');
                const minutos = String(fecha.getMinutes()).padStart(2, '0');
            
                return {
                    ...notification,
                    fechaHora: `${dia}-${mes}-${anio} ${horas}:${minutos}`
                };
            });
    
            this.clasificarNotificaciones();
        });
    }
    clasificarNotificaciones() {
        const ahora = new Date();
        this.hoy = [];
        this.ayer = [];
        this.semanaPasada = [];
    
        this.notificaciones.forEach(notificacion => {
            const fechaNotif = this.parseFecha(notificacion.fechaHora);
            
            const fechaSinHoraNotif = new Date(fechaNotif.getFullYear(), fechaNotif.getMonth(), fechaNotif.getDate());
            const fechaSinHoraHoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
            
            const diferenciaDias = Math.floor((fechaSinHoraHoy.getTime() - fechaSinHoraNotif.getTime()) / (1000 * 60 * 60 * 24));
    
            if (diferenciaDias === 0) {
                this.hoy.push(notificacion);
            } else if (diferenciaDias === 1) {
                this.ayer.push(notificacion);
            } else {
                this.semanaPasada.push(notificacion);
            }
        });
    }    
    parseFecha(fechaStr: string): Date {
        const [dia, mes, anioHora] = fechaStr.split('-');
        const [anio, hora] = anioHora.split(' ');
        const [horas, minutos] = hora.split(':');
    
        return new Date(
            Number(anio),
            Number(mes) - 1,
            Number(dia),
            Number(horas),
            Number(minutos)
        );
    }    
}