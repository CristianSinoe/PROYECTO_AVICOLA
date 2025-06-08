import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DataService } from '../../../services/data.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-vista-datos',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './vista-datos.component.html',
  styleUrls: ['./vista-datos.component.scss']
})
export class VistaDatosComponent implements OnInit {
  nombreEncargado = '';
  resumen: { zona: string; kazeta: string; alimento: number; mortalidad: number }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.dataService.getData().subscribe(data => {
      const usuario = data.usuarios.find((u: any) => u.email === user.email);
      this.nombreEncargado = usuario?.nombre || user.email;

      const kazetasAsignadas = data.kazetas.filter((k: any) =>
        usuario.kazetasAsignadas?.includes(k.id)
      );

      this.resumen = kazetasAsignadas.map((kazeta: any) => {
        const zona = kazeta.zona;
        const nombre = kazeta.nombre;

        const alimentos = data.registrosAlimento[zona]?.[nombre] || [];
        const mortalidades = data.registrosMortalidad[zona]?.[nombre] || [];

        const totalAlimento = alimentos.reduce((sum: number, r: any) => sum + r.cantidad, 0);
        const totalMortalidad = mortalidades.reduce((sum: number, r: any) => sum + r.cantidad, 0);

        return {
          zona,
          kazeta: nombre,
          alimento: totalAlimento,
          mortalidad: totalMortalidad
        };
      });
    });
  }
}
