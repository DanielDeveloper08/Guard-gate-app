import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVisitComponent } from './pages/list-visit/list-visit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitRoutingModule } from './visit.routing';
import { CardVisitComponent } from '../../shared/components/visit/card-visit/card-visit.component';
import { AddVisitQrComponent } from './pages/add-visit-qr/add-visit-qr.component';
import { AddVisitPreAuthorizedComponent } from './pages/add-visit-pre-authorized/add-visit-pre-authorized.component';
import { SuccessVisitQrComponent } from './components/success-visit-qr/success-visit-qr.component';
import { VisitorsModule } from '../visitors/visitors.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VisitRoutingModule,
    VisitorsModule
  ],
  declarations: [
    ListVisitComponent,
    AddVisitQrComponent,
    AddVisitPreAuthorizedComponent,
    SuccessVisitQrComponent,
  ],
})
export class VisitModule { }
