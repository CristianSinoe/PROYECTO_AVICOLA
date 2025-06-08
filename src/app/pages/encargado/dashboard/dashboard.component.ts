import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; // 👈 importar módulo PrimeNG

@Component({
  selector: 'app-encargado-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule], // 👈 aquí lo agregas
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}




