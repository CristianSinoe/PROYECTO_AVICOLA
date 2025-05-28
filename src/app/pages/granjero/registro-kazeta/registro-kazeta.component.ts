import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-registro-kazeta',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './registro-kazeta.component.html',
  styleUrls: ['./registro-kazeta.component.scss']
})
export class RegistroKazetaComponent {
  registros = [
    { fecha: '2025-05-25', descripcion: 'Alimento entregado', cantidad: 50 },
    { fecha: '2025-05-26', descripcion: 'Mortalidad registrada', cantidad: 3 }
  ];
}