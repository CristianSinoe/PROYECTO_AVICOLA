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
  selector: 'app-registro-consumo',
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
  templateUrl: './registro-consumo.component.html',
  styleUrls: ['./registro-consumo.component.scss'],
  providers: [MessageService]
})
export class RegistroConsumoComponent implements OnInit {
  zonas: string[] = [];
  kazetas: string[] = [];
  selectedZona: string = '';
  selectedKazeta: string = '';
  fecha: Date | undefined;
  cantidad: number | undefined;
  loading = false;
  nombreEncargado = '';

  constructor(private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.dataService.getData().subscribe(data => {
      const usuario = data.usuarios.find((u: any) => u.email === user.email);
      this.nombreEncargado = usuario?.nombre || user.email;
      this.zonas = Object.keys(data.registrosAlimento);
    });
  }

  onZonaChange() {
    this.selectedKazeta = '';
    this.kazetas = [];
    this.dataService.getData().subscribe(data => {
      if (data.registrosAlimento[this.selectedZona]) {
        this.kazetas = Object.keys(data.registrosAlimento[this.selectedZona]);
      }
    });
  }

  guardar() {
    if (!this.selectedZona || !this.selectedKazeta || !this.fecha || !this.cantidad) {
      this.messageService.add({ severity: 'error', summary: 'Campos incompletos', detail: 'Llena todos los campos.' });
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Registro guardado',
        detail: `Zona: ${this.selectedZona}, Kazeta: ${this.selectedKazeta}, Cantidad: ${this.cantidad}`
      });
      this.selectedZona = '';
      this.selectedKazeta = '';
      this.fecha = undefined;
      this.cantidad = undefined;
    }, 1000);
  }
}