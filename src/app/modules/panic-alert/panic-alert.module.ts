import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanicAlertComponent } from './pages/panic-alert/panic-alert.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PanicAlertRoutingModule } from './panic-alert.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PanicAlertRoutingModule
  ],
  declarations: [PanicAlertComponent]
})
export class PanicAlertModule { }
