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
      <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-80" />
    </div>
  `
})
export class RevenueStreamWidget implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;

  constructor(
    public layoutService: LayoutService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
      this.loadChartData();
    });
    this.loadChartData(); // Para cargar al iniciar
  }

  loadChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    this.dataService.getData().subscribe(data => {
      const chartData = data.promedioAlimento;

      this.chartData = {
        labels: chartData.labels,
        datasets: chartData.datasets.map((ds: any, index: number) => ({
          type: 'bar',
          label: ds.label,
          data: ds.data,
          backgroundColor: documentStyle.getPropertyValue(`--p-primary-${400 - index * 100}`),
          barThickness: 32,
          ...(index === chartData.datasets.length - 1 && {
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
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
