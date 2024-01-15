import { Component, OnInit, inject} from '@angular/core';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { LinearChartComponent } from '../../components/linear-chart/linear-chart.component';
import { DashboardService } from '../../services/dashboard.service';
import { IGeneralRequestDateFilter } from 'src/app/shared/interfaces/general.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visit-dashboard',
  templateUrl: './visit-dashboard.component.html',
  styleUrls: ['./visit-dashboard.component.scss']
})
export class VisitDashboardComponent implements OnInit {
  private _dashboardService = inject(DashboardService);

  visitsSumarized:{class:string, total:number}[]=[];
  dailyVisits:{date:Date, total:number}[]=[];
  fromDate:Date= new Date();
  toDate:Date=new Date();

  constructor(private datePipe: DatePipe){
    this.toDate.setDate(this.fromDate.getDate()+7);
  }

  ngOnInit() {
    this.getVisitsSUmarized();
  }

  getVisitsSUmarized(){
    this.visitsSumarized=[];
    this.dailyVisits=[];

    const queryParams: IGeneralRequestDateFilter = {
      fromDate: this.datePipe.transform(this.fromDate,'yyyy-MM-dd') || '',
      toDate:this.datePipe.transform(this.toDate,'yyyy-MM-dd') || ''
    };

    this._dashboardService.getVisitsSUmarized(queryParams).subscribe({
      next: (res) => {
        this.visitsSumarized = res.data.map((visitSumarized) => (
          {class:visitSumarized.status, total:Number(visitSumarized.count)}
        ));
      }
    });

    this._dashboardService.getDailyVisits(queryParams).subscribe({
      next: (res) => {
        this.dailyVisits = res.data.map((visitSumarized) => (
          {date:new Date(visitSumarized.date), total:Number(visitSumarized.count)}
        ));
      }
    });
  }

}