import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { SplashScreenComponent } from './pages/splash-screen/splash-screen.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    PasswordRecoveryComponent,
    SplashScreenComponent
  ]
})
export class AuthModule { }
