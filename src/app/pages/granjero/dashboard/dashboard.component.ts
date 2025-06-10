import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-granjero-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nombreGranjero: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.dataService.getData().subscribe((data: any) => {
      const usuarioCompleto = data.usuarios.find((u: any) => u.email === user.email);
      this.nombreGranjero = usuarioCompleto?.nombre || 'Granjero';
    });
  }
}