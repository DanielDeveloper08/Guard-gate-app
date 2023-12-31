import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ListRoleComponent } from "./pages/role/list-role/list-role.component";
import { EditRoleComponent } from "./pages/role/edit-role/edit-role.component";
import { VisitDashboardComponent } from "./pages/visit-dashboard/visit-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {path:'roles', component: ListRoleComponent},
      {path:'edit-role/:name', component: EditRoleComponent},
      {path:'visit-dashboard', component: VisitDashboardComponent},
    ],
    
  },
  { path: '**', redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
