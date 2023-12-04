import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { VisitComponent } from "./pages/list-visit/visit.component";

const routes: Routes = [
  {
    path: '',
    component: VisitComponent
  },
  { path: '**', redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitRoutingModule {}
