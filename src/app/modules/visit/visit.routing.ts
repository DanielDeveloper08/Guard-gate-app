import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ListVisitComponent } from "./pages/list-visit/list-visit.component";
import { AddVisitQrComponent } from "./pages/add-visit-qr/add-visit-qr.component";
import { AddVisitPreAuthorizedComponent } from "./pages/add-visit-pre-authorized/add-visit-pre-authorized.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list-visit'
  },
  {
    path: 'list-visit',
    component: ListVisitComponent
  },
  {
    path: 'add-visit-qr',
    component: AddVisitQrComponent,
  },
  {
    path: 'visitors',
    loadChildren: () => import('../visitors/visitors.module').then(m => m.VisitorsModule),
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
