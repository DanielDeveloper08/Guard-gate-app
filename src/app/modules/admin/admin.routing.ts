import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ListRoleComponent } from "./pages/role/list-role/list-role.component";
import { EditRoleComponent } from "./pages/role/edit-role/edit-role.component";
import { VisitDashboardComponent } from "./pages/visit-dashboard/visit-dashboard.component";
import { UserFormComponent } from "./pages/user/user-form/user-form.component";
import { ListUserComponent } from "./pages/user/list-user/list-user.component";
import { ListResidentComponent } from "./pages/resident/list-resident/list-resident.component";
import { EditResidentComponent } from "./pages/resident/edit-resident/edit-resident.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {path:'', redirectTo:'visit-dashboard', pathMatch:'full'},
      {path:'visit-dashboard', component: VisitDashboardComponent},
      {path:'roles', component: ListRoleComponent},
      {path:'edit-role/:name', component: EditRoleComponent},
      {path:'users', component: ListUserComponent},
      {path:'user/:id', component: UserFormComponent},
      {path:'user', component: UserFormComponent},
      {path:'residents', component: ListResidentComponent},
      {path:'edit-resident/:id', component: EditResidentComponent}
    ],

  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
