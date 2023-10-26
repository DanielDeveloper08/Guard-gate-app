import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './components/otp/otp.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ],
  exports:[
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    OtpComponent
  ],
  declarations: [
    OtpComponent
  ]
})
export class SharedModule { }
