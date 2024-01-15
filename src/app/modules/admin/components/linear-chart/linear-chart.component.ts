import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {
  @Input() data:{date:Date,total:number}[]=[];
  @Input() fromDate!:Date;
  @Input() toDate!:Date;

  public lineChart: any;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.createLineChart();
  }

  createLineChart() {
    let labels:string[] = [];
    let data:number[] = [];
    console.log(this.data)
    while (this.fromDate <= this.toDate) {
      labels.push(this.datePipe.transform(this.fromDate,'yyyy-MM-dd') || '');
      const datum = this.data.find(datum=>this.datePipe.transform(datum.date,'yyyy-MM-dd')==this.datePipe.transform(this.fromDate,'yyyy-MM-dd'));
      if(datum){
        data.push(datum.total);
      }
      else{
        data.push(0);
      }
      this.fromDate.setDate(this.fromDate.getDate() + 1);
      
    }
    

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
              text: 'Fecha'
            }
          }
        }
      }
    });
  }

}
