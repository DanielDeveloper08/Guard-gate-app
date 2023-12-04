import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home.routing';
import { HomeInformationComponent } from './components/home-information/home-information.component';
import { LastVisitComponent } from './components/last-visit/last-visit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    HomeInformationComponent,
    LastVisitComponent
  ],
})
export class HomeModule { }
