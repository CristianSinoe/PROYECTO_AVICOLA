import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; 
import { DataService } from '../../../services/data.service';// 👈 importar módulo PrimeNG

@Component({
  selector: 'app-encargado-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule], // 👈 aquí lo agregas
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nombreEncargado: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.dataService.getData().subscribe((data: any) => {
      const usuario = data.usuarios.find((u: any) => u.email === user.email);
      this.nombreEncargado = usuario?.nombre || 'Encargado';
    });
  }
}