import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';

interface Kazeta {
  id: string;
  nombre: string;
  ubicacion: string;
  numCasetas: number;
  certificadoSagarpa: string;
  numRegistro: string;
}

@Component({
  selector: 'app-parvada-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  templateUrl: './parvada-detail.component.html'
})
export class ParvadaDetailComponent implements OnInit {
  kazetas = signal<Kazeta[]>([]);
  zona!: string;
  parvadaNombre!: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.zona = params.get('zona') || '';
      this.parvadaNombre = params.get('parvada') || '';
      this.cargarKazetas();
    });
  }

  cargarKazetas() {
    this.dataService.getData().subscribe(data => {
      const zonaData = data.promedioAlimento[this.zona];
      if (!zonaData) return;

      // Simulación: se asignan todas las kazetas de la zona a la parvada
      const kazetasAsociadas = zonaData.labels.map((label: string, index: number) => ({
        id: `${this.zona}-${label}`,
        nombre: label,
        ubicacion: ` UBICACION AUTOMATICA DE ${label}`,
        numCasetas: 1,
        certificadoSagarpa: '',
        numRegistro: ''
      }));

      this.kazetas.set(kazetasAsociadas);
    });
  }
}
