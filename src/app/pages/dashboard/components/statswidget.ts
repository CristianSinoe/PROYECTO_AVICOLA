import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-stats-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="grid grid-cols-12 gap-4">
    <!-- ZONAS -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">ZONAS</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ zonas }}</div>
          </div>
          <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-map-marker text-blue-500 text-3xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">{{ kazetasPorZona }}</span>
        <span class="text-muted-color"> KAZETAS POR ZONA</span>
      </div>
    </div>

    <!-- EMBALAJES -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">EMBALAJES</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">\${{ embalajes }}</div>
          </div>
          <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-dollar text-orange-500 text-3xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">{{ embalajesPorcentaje }}%</span>
        <span class="text-muted-color"> DESDE LA SEMANA PASADA</span>
      </div>
    </div>

    <!-- EMPLEADOS -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">NÚMERO DE EMPLEADOS</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ empleados }}</div>
          </div>
          <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-cyan-500 text-3xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">{{ empleadosRecientes }}</span>
        <span class="text-muted-color"> REGISTROS RECIENTMENTE</span>
      </div>
    </div>

    <!-- DIAGNÓSTICOS -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">DIAGNÓSTICOS</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ diagnosticosPorRevisar }} POR REVISAR</div>
          </div>
          <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-comment text-purple-500 text-3xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">{{ diagnosticosRevisados }}</span>
        <span class="text-muted-color"> REVISADOS</span>
      </div>
    </div>
  </div>
  `
})
export class StatsWidget implements OnInit {
  zonas = 0;
  kazetasPorZona = 0;
  embalajes = 0;
  embalajesPorcentaje = 0;
  empleados = 0;
  empleadosRecientes = 0;
  diagnosticosPorRevisar = 0;
  diagnosticosRevisados = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      console.log('📥 Datos cargados desde JSON:', data);
      this.zonas = data.zonas;
      this.kazetasPorZona = data.kazetasPorZona;
      this.embalajes = data.embalajes.total;
      this.embalajesPorcentaje = data.embalajes.percentage;
      this.empleados = data.empleados.total;
      this.empleadosRecientes = data.empleados.recientes;
      this.diagnosticosPorRevisar = data.diagnosticos.porRevisar;
      this.diagnosticosRevisados = data.diagnosticos.revisados;
    });
  }
}
