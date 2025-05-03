import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../layout/service/layout.service';
import { ChartModule } from 'primeng/chart';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-kazeta-detail',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './kazeta-detail.component.html'
})
export class KazetaDetailComponent implements OnInit, OnDestroy {
  alimentoChartData: any;
  mortalidadChartData: any;
  chartOptions: any;
  mortalidadChartOptions: any;
  subscription!: Subscription;

  zona: string = '';
  kazetaIndex: number = 0;
  data: any;

  valorAlimento: number | null = null;
  valorMortalidad: number | null = null;

  constructor(
    public layoutService: LayoutService,
    private dataService: DataService,
    private route: ActivatedRoute  // Para obtener la zona y kazetaIndex desde la URL
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.zona = params.get('zona')!;
      this.kazetaIndex = +params.get('kazetaIndex')! - 1;

      this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
        this.loadChartData();
      });
      this.loadChartData();
    });
  }

  loadChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    this.dataService.getData().subscribe(data => {
      this.data = data;

      const alimentoData = data.promedioAlimento;
      const mortalidadData = data.promedioMortalidad;

      this.alimentoChartData = {
        labels: alimentoData.labels,
        datasets: alimentoData.datasets.map((ds: any, index: number) => ({
          type: 'bar',
          label: ds.label,
          data: ds.data,
          backgroundColor: documentStyle.getPropertyValue(`--p-primary-${400 - index * 100}`),
          barThickness: 32,
          ...(index === alimentoData.datasets.length - 1 && {
            borderRadius: {
              topLeft: 8,
              topRight: 8,
              bottomLeft: 0,
              bottomRight: 0
            },
            borderSkipped: false
          })
        }))
      };

      this.mortalidadChartData = {
        labels: mortalidadData.labels,
        datasets: mortalidadData.datasets.map((ds: any, index: number) => ({
          type: 'bar',
          label: ds.label,
          data: ds.data,
          backgroundColor: this.getRedTone(index),
          barThickness: 32,
          ...(index === mortalidadData.datasets.length - 1 && {
            borderRadius: {
              topLeft: 8,
              topRight: 8,
              bottomLeft: 0,
              bottomRight: 0
            },
            borderSkipped: false
          })
        }))
      };

      this.chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: textMutedColor
            },
            grid: {
              color: 'transparent',
              borderColor: 'transparent'
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: textMutedColor
            },
            grid: {
              color: borderColor,
              borderColor: 'transparent',
              drawTicks: false
            }
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

      // Asignar los valores automáticamente al cargar los datos
      const alimentoDataset = this.data.promedioAlimento.datasets.find((d: any) => d.label === this.zona);
      const mortalidadDataset = this.data.promedioMortalidad.datasets.find((d: any) => d.label === this.zona);

      this.valorAlimento = alimentoDataset?.data[this.kazetaIndex] ?? null;
      this.valorMortalidad = mortalidadDataset?.data[this.kazetaIndex] ?? null;
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

  verAlimento() {
    const dataset = this.data.promedioAlimento.datasets.find((d: any) => d.label === this.zona);
    if (dataset) {
      this.valorAlimento = dataset.data[this.kazetaIndex];
    }
  }

  verMortalidad() {
    const dataset = this.data.promedioMortalidad.datasets.find((d: any) => d.label === this.zona);
    if (dataset) {
      this.valorMortalidad = dataset.data[this.kazetaIndex];
    }
  }
}
