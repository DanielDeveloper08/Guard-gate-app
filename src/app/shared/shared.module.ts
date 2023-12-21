import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './components/otp/otp.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CamelCasePipe } from './pipes/CamelCase.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { AvatarComponent } from './components/avatar/avatar.component';
import { TruncateWordPipe } from './pipes/TruncateWord.pipe';
import { CustomFilterPipe } from './pipes/CustomFilter.pipe';
import { SelectDateComponent } from './components/select-date/select-date.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    HttpClientModule
  ],
  exports:[
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    OtpComponent,
    InputComponent,
    ButtonComponent,
    HeaderComponent,
    HttpClientModule,
    FormsModule,
    CamelCasePipe,
    TruncateWordPipe,
    QRCodeModule,
    AvatarComponent,
    CustomFilterPipe,
    SelectDateComponent
  ],
  declarations: [
    OtpComponent,
    InputComponent,
    ButtonComponent,
    HeaderComponent,
    CamelCasePipe,
    TruncateWordPipe,
    AvatarComponent,
    CustomFilterPipe,
    SelectDateComponent
  ]
})
export class SharedModule { }
