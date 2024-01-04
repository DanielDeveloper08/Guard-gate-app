import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ListRole } from "./pages/role/list-role/list-role.component";
import { EditRoleComponent } from "./pages/role/edit-role/edit-role.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {path:'roles', component: ListRole},
      {path:'edit-role/:role', component: EditRoleComponent},
    ],
    
  },
  { path: '**', redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
