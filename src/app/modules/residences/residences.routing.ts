import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ListResidencesComponent } from "./pages/list-residences/list-residences.component";

const routes: Routes = [
  {
    path: '',
    component: ListResidencesComponent
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidenceRoutingModule {}

