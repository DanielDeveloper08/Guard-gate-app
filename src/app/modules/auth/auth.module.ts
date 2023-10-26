import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { SplashScreenComponent } from './pages/splash-screen/splash-screen.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { FormNewPasswordComponent } from './components/form-new-password/form-new-password.component';
import { FormOtpComponent } from './components/form-otp/form-otp.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    PasswordRecoveryComponent,
    SplashScreenComponent,
    FormNewPasswordComponent,
    FormOtpComponent
  ]
})
export class AuthModule { }
