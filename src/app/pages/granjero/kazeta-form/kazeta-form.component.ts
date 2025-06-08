import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-kazeta-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './kazeta-form.component.html',
  styleUrls: ['./kazeta-form.component.scss']
})
export class KazetaFormComponent implements OnInit {
  kazetaId: number = 0;
  kazeta: any = null;
  alimento: number | null = null;
  mortalidad: number | null = null;
  editando: boolean = false;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService) {}
  
  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.kazetaId = +params['id'];
    this.dataService.getData().subscribe(data => {
      this.cargarKazeta(data);
    });
  });
}

private cargarKazeta(data: any): void {
  const usuario = JSON.parse(localStorage.getItem('user') || '{}');
  const userInfo = data.usuarios.find((u: any) => u.email === usuario.email);
  const kazeta = data.kazetas.find((k: any) => k.id === this.kazetaId);

  this.kazeta = kazeta;

  const zona = kazeta.zona;
  const nombre = kazeta.nombre;

  const alimentoData = data.registrosAlimento?.[zona]?.[nombre]?.at(-1);
  const mortalidadData = data.registrosMortalidad?.[zona]?.[nombre]?.at(-1);

  this.alimento = alimentoData?.cantidad || null;
  this.mortalidad = mortalidadData?.cantidad || null;
  this.editando = !!(alimentoData || mortalidadData);
}



  guardar() {
  this.loading = true;

  setTimeout(() => {
    this.messageService.add({
      severity: 'success',
      summary: 'ÉXITO',
      detail: `DATOS GUARDADOS PARA ${this.kazeta?.nombre}`,
      life: 3000
    });
    this.loading = false;
  }, 1000);
}
}
