import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements AfterViewInit {
  @Input() data :{class:string, total:number}[]=[];
  @ViewChild('doughnutChart') doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChartContainer') chartContainer!: ElementRef<HTMLCanvasElement>;
  public doughnutChart: any;

  constructor(private renderer: Renderer2) {
  }

  colors:string[]=[
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(61, 196, 68)',
  ];

  ngAfterViewInit() {
    this.createDoughnutChart();
    this.resizeDoughnutChartChange();
  }

  createDoughnutChart() {
    const labels = this.data.map(datum=>datum.class);
    const data = this.data.map(datum=>datum.total);
    const backgroundColors = this.data.map((datum, index)=>this.colors[(index+1)%this.colors.length]);

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
