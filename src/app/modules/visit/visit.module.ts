import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVisitComponent } from './pages/list-visit/list-visit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitRoutingModule } from './visit.routing';
import { CardVisitComponent } from './components/card-visit/card-visit.component';
import { AddVisitQrComponent } from './pages/add-visit-qr/add-visit-qr.component';
import { AddVisitPreAuthorizedComponent } from './pages/add-visit-pre-authorized/add-visit-pre-authorized.component';
import { VisitorsModule } from '../visitors/visitors.module';
import { DetailVisitComponent } from './components/detail-visit/detail-visit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VisitRoutingModule,
    VisitorsModule
  ],
  declarations: [
    ListVisitComponent,
    CardVisitComponent,
    AddVisitQrComponent,
    AddVisitPreAuthorizedComponent,
    DetailVisitComponent
  ]
})
export class VisitModule { }
