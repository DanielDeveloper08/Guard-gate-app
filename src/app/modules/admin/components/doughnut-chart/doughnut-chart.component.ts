import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements AfterViewInit {
  @ViewChild('doughnutChart') doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChartContainer') chartContainer!: ElementRef<HTMLCanvasElement>;
  public doughnutChart: any;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.createDoughnutChart();
    this.resizeDoughnutChartChange();
  }

  createDoughnutChart() {
    const labels = ['Red', 'Blue', 'Yellow'];
    const data = [30, 40, 20]; // Sample data for demonstration
    const backgroundColors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
    ];

    this.doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio:false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estado de las Visitas'
          }
        }
      }
    });
  }
  resizeChartCanvas() {
    const canvas = this.doughnutCanvas.nativeElement;
    const container = this.chartContainer.nativeElement;
    
    this.renderer.setAttribute(canvas, 'width', (container.offsetWidth).toString());
    this.renderer.setAttribute(canvas, 'height', (container.offsetHeight).toString());
  }

  resizeObserver!:ResizeObserver;
  resizeDoughnutChartChange() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.doughnutChart) {
        this.resizeChartCanvas();
        this.doughnutChart.resize();
      }
    });

    this.resizeObserver.observe(this.chartContainer.nativeElement);
  }
}
