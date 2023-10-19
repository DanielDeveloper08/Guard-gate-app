import { RouterModule, Routes } from "@angular/router";
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { NgModule } from "@angular/core";
import { SplashScreenComponent } from "./pages/splash-screen/splash-screen.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recovery-password',
    component: PasswordRecoveryComponent,
  },
  {
    path: 'splash',
    component: SplashScreenComponent,
  },
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/login' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
