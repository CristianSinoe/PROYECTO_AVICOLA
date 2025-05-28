import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-granjero-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterModule],
  templateUrl: './granjero-menu.component.html',
  styleUrls: ['./granjero-menu.component.scss']
})
export class GranjeroMenuComponent {
  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: ['/granjero']
    },
    {
      label: 'Registro de Kazeta',
      icon: 'pi pi-pencil',
      routerLink: ['/granjero/registro-kazeta']
    },
    // Agrega más ítems si en el futuro hay más opciones para el granjero
  ];
}
