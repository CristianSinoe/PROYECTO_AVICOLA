import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenue-stream-widget',
  standalone: true,
  imports: [ChartModule, CommonModule],
  template: `
    <div class="card !mb-8">
      <div class="font-semibold text-xl mb-4">PROMEDIO DE ALIMENTO: </div>
      <p-chart type="bar" [data]="alimentoChartData" [options]="chartOptions" class="h-80" />
    </div>

    <div class="card !mb-8">
      <div class="font-semibold text-xl mb-4">PROMEDIO DE MORTALIDAD: </div>
      <p-chart type="bar" [data]="mortalidadChartData" [options]="mortalidadChartOptions" class="h-80" />
    </div>
  `
})
export class RevenueStreamWidget implements OnInit, OnDestroy {
  alimentoChartData: any;
  mortalidadChartData: any;
  chartOptions: any;
  mortalidadChartOptions: any;
  subscription!: Subscription;

  constructor(
    public layoutService: LayoutService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
      this.loadChartData();
    });
    this.loadChartData();
  }

  loadChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');
  
    this.dataService.getData().subscribe(data => {
      const alimentoData = data.promedioAlimento;
      const mortalidadData = data.promedioMortalidad;
  
      const zonas = Object.keys(alimentoData);
      const maxKazetas = Math.max(...zonas.map(z => alimentoData[z].data.length));
  
      // 🔹 Datos apilados por Kazeta Index
      const alimentoDatasets = Array.from({ length: maxKazetas }, (_, i) => {
        const dataset = {
          type: 'bar',
          label: `Kazeta ${i + 1}`,
          data: zonas.map(z => alimentoData[z].data[i] ?? 0),
          backgroundColor: documentStyle.getPropertyValue(`--p-primary-${400 - i * 100}`),
          barThickness: 32
        };
  
        if (i === maxKazetas - 1) {
          Object.assign(dataset, {
            borderRadius: { topLeft: 8, topRight: 8 },
            borderSkipped: false
          });
        }
  
        return dataset;
      });
  
      const mortalidadDatasets = Array.from({ length: maxKazetas }, (_, i) => {
        const dataset = {
          type: 'bar',
          label: `Kazeta ${i + 1}`,
          data: zonas.map(z => mortalidadData[z]?.data[i] ?? 0),
          backgroundColor: this.getRedTone(i),
          barThickness: 32
        };
  
        if (i === maxKazetas - 1) {
          Object.assign(dataset, {
            borderRadius: { topLeft: 8, topRight: 8 },
            borderSkipped: false
          });
        }
  
        return dataset;
      });
  
      this.alimentoChartData = { labels: zonas, datasets: alimentoDatasets };
      this.mortalidadChartData = { labels: zonas, datasets: mortalidadDatasets };
  
      this.chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.9,
        plugins: {
          legend: { labels: { color: textColor } }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: textMutedColor },
            grid: { color: 'transparent', borderColor: 'transparent' }
          },
          y: {
            stacked: true,
            ticks: { color: textMutedColor },
            grid: { color: borderColor, borderColor: 'transparent', drawTicks: false }
          }
        }
      };
  
      this.mortalidadChartOptions = {
        ...this.chartOptions,
        plugins: {
          legend: {
            labels: {
              color: 'red'
            }
          }
        }
      };
    });
  }  

  getRedTone(index: number) {
    const redTones = ['#ff7f7f', '#ff4c4c', '#ff0000'];
    return redTones[index % redTones.length];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
