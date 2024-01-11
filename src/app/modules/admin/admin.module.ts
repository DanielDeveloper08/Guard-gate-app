import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';
import { ListRoleComponent } from './pages/role/list-role/list-role.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { LinearChartComponent } from './components/linear-chart/linear-chart.component';
import { VisitDashboardComponent } from './pages/visit-dashboard/visit-dashboard.component';
import { EditResidentComponent } from './components/resident/edit-resident/edit-resident.component';
import { ListResidentComponent } from './components/resident/list-resident/list-resident.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    TableModule,
    ButtonModule,
  ],
  declarations: [
    ListResidentComponent,
    EditResidentComponent,
    DashboardComponent,
    EditRoleComponent,
    ListRoleComponent,
    DoughnutChartComponent,
    LinearChartComponent,
    VisitDashboardComponent
  ],
})
export class AdminModule { }
