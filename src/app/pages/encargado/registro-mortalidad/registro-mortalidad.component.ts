import { Component, OnInit, signal } from '@angular/core';
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
  selector: 'app-registro-mortalidad',
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
  templateUrl: './registro-mortalidad.component.html',
  styleUrls: ['./registro-mortalidad.component.scss'],
  providers: [MessageService]
})
export class RegistroMortalidadComponent implements OnInit {
  zonas: string[] = [];
  kazetas: { label: string; value: string }[] = [];
  selectedZona: string | null = null;
  selectedKazeta: string | null = null;
  fecha: Date = new Date();
  cantidad: number = 0;
  loading = false;
  editMode = false;
  nombreEncargado = '';

  private usuario: any;
  private todasKazetas: any[] = [];

  constructor(private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.dataService.getData().subscribe((data: any) => {
      this.usuario = data.usuarios.find((u: any) => u.email === user.email);
      this.nombreEncargado = this.usuario?.nombre || user.email;

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

  toggleEditMode() {
    if (this.editMode) {
      this.guardar();
    }
    this.editMode = !this.editMode;
  }

  guardar() {
    if (!this.selectedZona || !this.selectedKazeta || !this.fecha || !this.cantidad) {
      this.messageService.add({
        severity: 'error', summary: 'CAMPOS INCOMPLETOS',detail: 'LLENA TODOS LOS CAMPOS'
      });
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.messageService.add({
        severity: 'success',
        summary: 'REGISTRO GUARDADO',
        detail: `ZONA: ${this.selectedZona}, KAZETA: ${this.selectedKazeta}, CANTIDAD: ${this.cantidad}`
      });

      this.editMode = false;
    }, 1000);
  }
}