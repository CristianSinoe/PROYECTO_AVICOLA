import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
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

interface Kazeta {
  id: string;
  nombre: string;
  ubicacion: string;
  numCasetas: number;
  certificadoSagarpa: string;
  numRegistro: string;
}

@Component({
  selector: 'app-zona-dashboard',
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
    IconFieldModule,
    InputIconModule,
    FileUploadModule,
    ToggleButtonModule
  ],
  templateUrl: './zona-dashboard.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ZonaDashboardComponent implements OnInit {
  kazetas = signal<Kazeta[]>([]);
  kazeta!: Kazeta;
  kazetaDialog = false;
  mostrarCertificado = false;
  submitted = false;
  selectedKazetas: Kazeta[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const zona = params.get('zona');
      console.log('ZONA OBTENIDA DE LA RUTA:', zona);
      if (zona) {
        this.cargarKazetasZona(zona);
      }
    });
  }
  

  cargarKazetasZona(zona: string) {
    this.dataService.getData().subscribe(data => {
      const infoZona = data.promedioAlimento[zona];

      if (!infoZona || !infoZona.labels) {
        console.warn(`NO HAY DATOS PARA LA ZONA: ${zona}`);
        this.kazetas.set([]);
        return;
      }

      const kazetasZona = infoZona.labels.map((label: string, i: number) => ({
        id: `${zona}-KZ${i + 1}`,
        nombre: label,
        ubicacion: `UBICACION AUTOMATICA DE  ${label}`,
        numCasetas: 1,
        certificadoSagarpa: '',
        numRegistro: ''
      }));

      this.kazetas.set(kazetasZona);
    });
  }

  openNew() {
    this.kazeta = {
      id: '',
      nombre: '',
      ubicacion: '',
      numCasetas: 0,
      certificadoSagarpa: '',
      numRegistro: ''
    };
    this.submitted = false;
    this.kazetaDialog = true;
  }

  editKazeta(kazeta: Kazeta) {
    this.kazeta = { ...kazeta };
    this.kazetaDialog = true;
  }

  deleteKazeta(kazeta: Kazeta) {
    this.confirmationService.confirm({
      message: `¿ESTAS SEGURDO DE ELIMINAR LA KAZETA "${kazeta.nombre}"?`,
      header: 'CONFIRMAR',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SI',
      rejectLabel: 'NO',
      accept: () => {
        this.kazetas.set(this.kazetas().filter(k => k.id !== kazeta.id));
        this.messageService.add({ severity: 'success', summary: 'EXITO', detail: 'KAZETA ELIMINADA', life: 3000 });
      }
    });
  }

  saveKazeta() {
    this.submitted = true;
    if (this.kazeta.nombre.trim()) {
      if (this.kazeta.id) {
        this.kazetas.set(this.kazetas().map(k => (k.id === this.kazeta.id ? this.kazeta : k)));
      } else {
        this.kazeta.id = 'KZ' + (this.kazetas().length + 1);
        this.kazetas.set([...this.kazetas(), this.kazeta]);
      }
      this.messageService.add({ severity: 'success', summary: 'EXITO', detail: 'KAZETA GUARDADA', life: 3000 });
      this.kazetaDialog = false;
    }
  }

  hideDialog() {
    this.kazetaDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }
}