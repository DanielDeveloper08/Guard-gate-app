import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListResidencesComponent } from './pages/list-residences/list-residences.component';
import { VisitsComponent } from './pages/visits/visits.component';
import { ResidenceRoutingModule } from './residences.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResidenceItemComponent } from './components/residence-item/residence-item.component';
import { SkeletonResidenceItemComponent } from './components/skeleton-residence-item/skeleton-residence-item.component';

@NgModule({
  imports: [CommonModule, SharedModule, ResidenceRoutingModule,],
  declarations: [
    ListResidencesComponent,
    VisitsComponent,
    ResidenceItemComponent,
    SkeletonResidenceItemComponent
  ],
})
export class ResidencesModule { }
