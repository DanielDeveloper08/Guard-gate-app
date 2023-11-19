import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanicAlertComponent } from './panic-alert.component';

const routes: Routes = [
  {
    path:'',
    component: PanicAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PanicAlertRoutingModule {}
