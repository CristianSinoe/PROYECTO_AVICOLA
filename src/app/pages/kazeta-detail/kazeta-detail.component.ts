import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

interface Registro {
  fecha: string;
  cantidad: number;
  tipo?: string;
  boleta?: string;
}

@Component({
  selector: 'app-kazeta-detail',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './kazeta-detail.component.html'
})
export class KazetaDetailComponent implements OnInit {
  zona!: string;
  kazetaNombre!: string;

  registrosAlimento: Registro[] = [];
  registrosMortalidad: Registro[] = [];

  totalAlimento = 0;
  totalMortalidad = 0;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.zona = decodeURIComponent(params.get('zona') || '');
      const parvada = decodeURIComponent(params.get('parvada') || '');
      this.kazetaNombre = decodeURIComponent(params.get('kazetaNombre') || '');
  
      this.dataService.getData().subscribe(data => {
        console.log("Zona:", this.zona);
        console.log("Kazeta:", this.kazetaNombre);
        console.log("Alimento accedido:", data.registrosAlimento?.[this.zona]?.[this.kazetaNombre]);
  
        const alimentoZona = data.registrosAlimento?.[this.zona]?.[this.kazetaNombre] || [];
        const mortalidadZona = data.registrosMortalidad?.[this.zona]?.[this.kazetaNombre] || [];
  
        this.registrosAlimento = alimentoZona;
        this.totalAlimento = alimentoZona.reduce((sum: number, r: Registro) => sum + r.cantidad, 0);
  
        this.registrosMortalidad = mortalidadZona;
        this.totalMortalidad = mortalidadZona.reduce((sum: number, r: Registro) => sum + r.cantidad, 0);
      });
    });
  }  

  exportar(tipo: 'pdf' | 'excel') {
    console.log(`Exportando como ${tipo.toUpperCase()}`);
  }
}
