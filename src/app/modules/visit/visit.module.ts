import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitComponent } from './visit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisitRoutingModule } from './visit.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VisitRoutingModule
  ],
  declarations: [VisitComponent]
})
export class VisitModule { }
