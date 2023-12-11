import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitComponent } from './pages/list-visit/visit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitRoutingModule } from './visit.routing';
import { CardVisitComponent } from './components/card-visit/card-visit.component';
import { AddVisitQrComponent } from './pages/add-visit-qr/add-visit-qr.component';
import { AddVisitPreAuthorizedComponent } from './pages/add-visit-pre-authorized/add-visit-pre-authorized.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VisitRoutingModule
  ],
  declarations: [
    VisitComponent,
    CardVisitComponent,
    AddVisitQrComponent,
    AddVisitPreAuthorizedComponent
  ]
})
export class VisitModule { }
