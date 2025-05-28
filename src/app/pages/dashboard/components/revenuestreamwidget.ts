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

      // Función para generar un color único con tonalidades más claras o más fuertes
      const generateZoneColor = (index: number) => {
        const baseColors = ['#03bb85', '#0957a2', '#ec0033', '#ffeb3b', '#ff4cff']; // Base colors to work with
        const baseColor = baseColors[index % baseColors.length];

        // Convert hex color to RGB
        const rgb = this.hexToRgb(baseColor);
        const brightnessFactor = 0.2 * (index + 1); // Adjust this factor to change how much stronger or lighter the color will be

        // Adjust the RGB values to create a stronger or lighter color
        const adjustedRgb = this.adjustColorBrightness(rgb, brightnessFactor);

        // Convert adjusted RGB back to hex
        return this.rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
      };

      // 🔹 Datos apilados por Kazeta Index
      const alimentoDatasets = Array.from({ length: maxKazetas }, (_, i) => {
        const dataset = {
          type: 'bar',
          label: `Kazeta ${i + 1}`,
          data: zonas.map(z => alimentoData[z].data[i] ?? 0),
          backgroundColor: zonas.map((z, index) => generateZoneColor(index)), // Asigna un color único y ajustado por zona
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
          backgroundColor: zonas.map((z, index) => generateZoneColor(index)), // Asigna un color único y ajustado por zona
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

  // Función para convertir hex a RGB
  hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  // Función para ajustar el brillo de un color RGB
  adjustColorBrightness(rgb: { r: number, g: number, b: number }, factor: number) {
    return {
      r: Math.min(255, Math.max(0, rgb.r + (rgb.r * factor))),
      g: Math.min(255, Math.max(0, rgb.g + (rgb.g * factor))),
      b: Math.min(255, Math.max(0, rgb.b + (rgb.b * factor))),
    };
  }

  // Función para convertir RGB a hex
  rgbToHex(r: number, g: number, b: number) {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
