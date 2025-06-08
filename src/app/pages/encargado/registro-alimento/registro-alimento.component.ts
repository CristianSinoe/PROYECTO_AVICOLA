import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-registro-alimento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './registro-alimento.component.html',
  styleUrls: ['./registro-alimento.component.scss']
})
export class RegistroAlimentoComponent {
  zonas: string[] = [];
  kazetas: { label: string; value: string }[] = [];

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

  guardar(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Registro exitoso' });
    }, 1500);
  }
}

