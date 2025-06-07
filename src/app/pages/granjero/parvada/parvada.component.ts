import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service'; // Ajusta ruta si hace falta
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

interface Parvada {
  nombre: string;
  descripcion: string;
  numPollos: number;
  fechaIngreso: string;
}

@Component({
  selector: 'app-granjero-parvada',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, FormsModule],
  templateUrl: './parvada.component.html',
  styleUrls: ['./parvada.component.scss']
})
export class ParvadaComponent implements OnInit {
  parvadas = signal<Parvada[]>([]);

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      // Aquí obtén las parvadas que correspondan al granjero
      // Por ahora traemos todas las parvadas (ajusta según necesidad)
      this.parvadas.set(data.parvadas?.Z1 || []);
    });
  }
}
