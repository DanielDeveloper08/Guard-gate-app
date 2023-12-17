import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: "guard-gate",
    canActivate: [AuthGuard],

    loadChildren: () => import('./modules/tab-initial/tab-initial.module').then(m => m.TabInitialModule)
  },
  {
    path: '',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: "guard-gate",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
