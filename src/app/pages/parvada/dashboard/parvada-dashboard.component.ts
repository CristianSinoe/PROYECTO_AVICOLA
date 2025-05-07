import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterModule } from '@angular/router';

interface Parvada {
  id: string;
  nombre: string;
  descripcion: string;
  numPollos: number;
  fechaIngreso: string;
}

@Component({
  selector: 'app-parvada-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    RouterModule
  ],
  templateUrl: './parvada-dashboard.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ParvadaDashboardComponent implements OnInit {
  parvadas = signal<Parvada[]>([]);
  parvada!: Parvada;
  parvadaDialog = false;
  submitted = false;
  selectedParvadas: Parvada[] = [];
  zona: string = ''; // 👈 Zona almacenada aquí

  @ViewChild('dt') dt!: Table;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.zona = params.get('zona') || '';
      if (this.zona) {
        this.loadParvadasByZona(this.zona);
      }
    });
  }

  loadParvadasByZona(zona: string) {
    this.dataService.getData().subscribe(data => {
      const parvadasZona = data.parvadas?.[zona] || [];
      this.parvadas.set(parvadasZona.map((p: Parvada, i: number) => ({
        ...p,
        id: zona + '-PV' + (i + 1)
      })));
    });
  }

  openNew() {
    this.parvada = {
      id: '',
      nombre: '',
      descripcion: '',
      numPollos: 0,
      fechaIngreso: new Date().toISOString().slice(0, 10)
    };
    this.submitted = false;
    this.parvadaDialog = true;
  }

  editParvada(parvada: Parvada) {
    this.parvada = { ...parvada };
    this.parvadaDialog = true;
  }

  deleteParvada(parvada: Parvada) {
    this.confirmationService.confirm({
      message: `¿ESTAS SEGURO DE ELIMINAR LA PARVADA "${parvada.nombre}"?`,
      header: 'CONFIRMAR',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SI',
      rejectLabel: 'NO',
      accept: () => {
        this.parvadas.set(this.parvadas().filter(p => p.id !== parvada.id));
        this.messageService.add({ severity: 'success', summary: 'ÉXITO', detail: 'PARVADA ELIMINADA', life: 3000 });
      }
    });
  }

  saveParvada() {
    this.submitted = true;
    if (this.parvada.nombre.trim()) {
      if (this.parvada.id) {
        this.parvadas.set(this.parvadas().map(p => (p.id === this.parvada.id ? this.parvada : p)));
      } else {
        this.parvada.id = this.zona + '-PV' + (this.parvadas().length + 1);
        this.parvadas.set([...this.parvadas(), this.parvada]);
      }
      this.messageService.add({ severity: 'success', summary: 'ÉXITO', detail: 'PARVADA GUARDADA', life: 3000 });
      this.parvadaDialog = false;
    }
  }

  hideDialog() {
    this.parvadaDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }
}
