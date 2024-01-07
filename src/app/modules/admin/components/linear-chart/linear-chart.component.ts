import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {

  public lineChart: any;

  constructor() {
  }

  ngOnInit() {
    this.createLineChart();
  }

  createLineChart() {
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
    const data = [10, 20, 15, 25, 30];

    this.lineChart = new Chart('linearChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Visitas',
          data: data,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)', 
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio:false,
        responsive:true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Visitas'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Meses'
            }
          }
        }
      }
    });
  }

}
