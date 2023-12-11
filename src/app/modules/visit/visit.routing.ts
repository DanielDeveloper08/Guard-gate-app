import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { VisitComponent } from "./pages/list-visit/visit.component";
import { AddVisitQrComponent } from "./pages/add-visit-qr/add-visit-qr.component";
import { AddVisitPreAuthorizedComponent } from "./pages/add-visit-pre-authorized/add-visit-pre-authorized.component";

const routes: Routes = [
  {
    path: '',
    component: VisitComponent
  },
  {
    path: 'add-visit-qr',
    component: AddVisitQrComponent
  },
  {
    path: 'add-visit-preauthorized',
    component: AddVisitPreAuthorizedComponent
  },
  { path: '**', redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitRoutingModule {}
