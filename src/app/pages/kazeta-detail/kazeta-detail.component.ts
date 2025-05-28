import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';           
import * as FileSaver from 'file-saver'; 
import jsPDF from 'jspdf';              
import autoTable from 'jspdf-autotable';

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
    if (tipo === 'excel') {
      const wsAlimento = XLSX.utils.json_to_sheet(this.registrosAlimento);
      const wsMortalidad = XLSX.utils.json_to_sheet(this.registrosMortalidad);
  
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, wsAlimento, 'Alimento');
      XLSX.utils.book_append_sheet(wb, wsMortalidad, 'Mortalidad');
  
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, `Reporte-Kazeta-${this.kazetaNombre}.xlsx`);
    } else if (tipo === 'pdf') {
      const doc = new jsPDF();
  
      doc.text(`Reporte Kazeta: ${this.kazetaNombre}`, 14, 10);

      
      let startY = 20;

      autoTable(doc, {
        head: [['Fecha', 'Boleta', 'Cantidad', 'Tipo']],
        body: this.registrosAlimento.map(r => [
          r.fecha ?? '',
          r.boleta ?? '',
          r.cantidad ?? 0,
          r.tipo ?? ''
        ]),        
        startY: startY,  
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] },
        margin: { bottom: 10 }
      });

     
      startY += 20; 

      autoTable(doc, {
        head: [['Fecha', 'Cantidad']],
        body: this.registrosMortalidad.map(r => [r.fecha, r.cantidad]),
        startY: startY, 
        theme: 'striped',
        headStyles: { fillColor: [192, 57, 43] }
      });
  
      doc.save(`Reporte-Kazeta-${this.kazetaNombre}.pdf`);
    }
  } 
}