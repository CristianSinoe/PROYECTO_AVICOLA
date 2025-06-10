import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-registro-peso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  templateUrl: './registro-peso.component.html',
  styleUrls: ['./registro-peso.component.scss'],
  providers: [MessageService]
})
export class RegistroPesoComponent {
  zonas: string[] = [];
  kazetas: { label: string; value: string }[] = [];
  modoEdicion = false;

  selectedZona: string | null = null;
  selectedKazeta: string | null = null;
  cantidad: number = 0;
  fecha: Date = new Date();
  loading = false;

  private usuario: any;
  private todasKazetas: any[] = [];
  nombreEncargado: string = '';

  constructor(private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.usuario = data.usuarios.find((u: any) => u.email === user.email);

      this.nombreEncargado = this.usuario?.nombre || 'Encargado';

      this.todasKazetas = data.kazetas.filter((k: any) =>
        this.usuario.kazetasAsignadas?.includes(k.id)
      );

      const zonasSet = new Set<string>();
      this.todasKazetas.forEach((k: any) => zonasSet.add(k.zona));
      this.zonas = Array.from(zonasSet);
    });
  }

  onZonaChange(): void {
    const filtradas = this.todasKazetas.filter((k: any) => k.zona === this.selectedZona);
    this.kazetas = filtradas.map((k: any) => ({
      label: k.nombre,
      value: k.nombre
    }));
    this.selectedKazeta = null;
  }

  toggleModoEdicion() {
    if (this.modoEdicion) {
      this.guardar();
    }
    this.modoEdicion = !this.modoEdicion;
  }

  guardar() {
    if (!this.selectedZona || !this.selectedKazeta || !this.fecha || !this.cantidad) {
      this.messageService.add({ severity: 'error', summary: 'CAMPOS INCOMPLETOS', detail: 'LLENA TODOS LOS CAMPOS' });
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.modoEdicion = false;
      this.messageService.add({
        severity: 'success',
        summary: 'REGISTRO GUARDADO',
        detail: `ZONA: ${this.selectedZona}, KAZETA: ${this.selectedKazeta}, CANTIDAD: ${this.cantidad}`
      });
    }, 1000);
  }
}