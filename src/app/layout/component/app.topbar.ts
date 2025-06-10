import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [CommonModule, StyleClassModule, OverlayPanelModule, CalendarModule, FormsModule],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>
                <a class="layout-topbar-logo" routerLink="/">
                    <!-- Aquí va tu logo -->
                    <span>PROYECTO AVICOLA</span>
                </a>
            </div>

            <div class="layout-topbar-actions">
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                        <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    </button>
                </div>

                <!-- Botón CALENDARIO con calendario emergente -->
                <p-overlayPanel #calendarPanel>
                    <p-calendar [(ngModel)]="selectedDate" dateFormat="dd/mm/yy" [showIcon]="true"></p-calendar>
                </p-overlayPanel>

                <button type="button" class="layout-topbar-action" (click)="calendarPanel.toggle($event)">
                    <i class="pi pi-calendar"></i>
                    <span>CALENDARIO</span>
                </button>

                <!-- Otros botones -->
                <button type="button" class="layout-topbar-action" (click)="onLogout()">
                    <i class="pi pi-user"></i>
                    <span>CERRAR SESIÓN</span>
                </button>

                <!-- Menú móvil -->
                <!-- <p-overlayPanel #op>
                    <button type="button" class="layout-topbar-action w-full justify-start" (click)="calendarPanel.toggle($event)">
                        <i class="pi pi-calendar mr-2"></i>
                        <span>CALENDARIO</span>
                    </button>
                    <button type="button" class="layout-topbar-action w-full justify-start" (click)="onLogout()">
                        <i class="pi pi-user mr-2"></i>
                        <span>CERRAR SESIÓN</span>
                    </button>
                </p-overlayPanel> -->

                <!-- <button class="layout-topbar-action block lg:hidden" (click)="op.toggle($event)">
                    <i class="pi pi-ellipsis-v"></i>
                </button> -->
            </div>
        </div>
    `
})
export class AppTopbar {
    selectedDate: Date | null = null;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
