import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home.routing';
import { LastVisitComponent } from './components/last-visit/last-visit.component';
import { PendingVisitsComponent } from './components/pending-visits/pending-visits.component';
import { SkeletonPendingVisitsComponent } from './components/skeleton-pending-visits/skeleton-pending-visits.component';
import { SkeletonHomeInformationComponent } from './components/skeleton-home-information/skeleton-home-information.component';
import { VisitorsModule } from '../visitors/visitors.module';
import { SkeletonLastVisitComponent } from './components/skeleton-last-visit/skeleton-last-visit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    VisitorsModule
  ],
  declarations: [
    HomeComponent,
    LastVisitComponent,
    PendingVisitsComponent,
    SkeletonPendingVisitsComponent,
    SkeletonHomeInformationComponent,
    SkeletonLastVisitComponent
  ],
})
export class HomeModule { }
