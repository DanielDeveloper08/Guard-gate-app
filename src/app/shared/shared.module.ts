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
import { CustomDatePipe } from './pipes/CustomDate.pipe';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { InitialsVisitorPipe } from './pipes/InitialsVisitor.pipe';
import { ScannerSharedComponent } from './components/scanner/scanner.component';
import { SelectComponent } from './components/select/select.component';
import { SkeletonItemVisitorComponent } from './components/skeleton-item-visitor/skeleton-item-visitor.component';
import { AccessTagComponent } from './components/access-tag/access-tag.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    HttpClientModule,
    QRCodeModule
  ],
  exports:[
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    OtpComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    HeaderComponent,
    HttpClientModule,
    FormsModule,
    CamelCasePipe,
    TruncateWordPipe,
    QRCodeModule,
    AvatarComponent,
    CustomFilterPipe,
    SelectDateComponent,
    CustomDatePipe,
    QrCodeComponent,
    InitialsVisitorPipe,
    ScannerSharedComponent,
    SkeletonItemVisitorComponent,
    AccessTagComponent
  ],
  declarations: [
    OtpComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    HeaderComponent,
    CamelCasePipe,
    TruncateWordPipe,
    AvatarComponent,
    CustomFilterPipe,
    SelectDateComponent,
    CustomDatePipe,
    QrCodeComponent,
    InitialsVisitorPipe,
    ScannerSharedComponent,
    SkeletonItemVisitorComponent,
    AccessTagComponent
  ]
})
export class SharedModule { }
