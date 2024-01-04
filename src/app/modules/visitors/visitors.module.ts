import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVisitorsComponent } from './pages/list-visitors/list-visitors.component';
import { AddVisitorComponent } from './pages/add-visitor/add-visitor.component';
import { VisitorRoutingModule } from './visitors.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemVisitorComponent } from './components/item-visitor/item-visitor.component';
import { SelectedVisitorsComponent } from './components/selected-visitors/selected-visitors.component';
import { FormVisitorComponent } from './components/form-visitor/form-visitor.component';
import { ActionsModalComponent } from './components/actions-modal/actions-modal.component';

@NgModule({
  imports: [
    CommonModule,
    VisitorRoutingModule,
    SharedModule
  ],
  declarations: [
    ListVisitorsComponent,
    AddVisitorComponent,
    ItemVisitorComponent,
    SelectedVisitorsComponent,
    FormVisitorComponent,
    ActionsModalComponent
  ],
  exports: [
    SelectedVisitorsComponent
  ]
})
export class VisitorsModule { }
