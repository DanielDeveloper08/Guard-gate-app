import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AddVisitorComponent } from './pages/add-visitor/add-visitor.component';
import { ListVisitorsComponent } from "./pages/list-visitors/list-visitors.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list-visitors' },
  {
    path: 'list-visitors',
    component: ListVisitorsComponent,
  },
  {
    path: 'add-visitor',
    component: AddVisitorComponent
  },
  {
    path: 'edit-visitor/:idVisitor',
    component: AddVisitorComponent
  },
  { path: '**', redirectTo: 'list-visitors' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorRoutingModule {}
