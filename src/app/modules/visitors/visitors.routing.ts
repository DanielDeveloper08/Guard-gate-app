import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AddVisitorComponent } from './pages/add-visitor/add-visitor.component';
import { ListVisitorsComponent } from "./pages/list-visitors/list-visitors.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view-visitors' },
  {
    path: 'view-visitors',
    component: ListVisitorsComponent,
  },
  {
    path: 'add-visitor',
    component: AddVisitorComponent
  },
  {
    path: 'list-visitor/:isVisit',
    component: ListVisitorsComponent
  },
  { path: '**', redirectTo: 'view-visitors' } // Cambiado a 'view-visitors' para redirigir a esa ruta en caso de ruta no válida
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorRoutingModule {}
