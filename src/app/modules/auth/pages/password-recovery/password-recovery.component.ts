import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { IonModal, NavController } from '@ionic/angular/common';
import { Position } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ICodeData,
  ICodeOtpRequest,
  INewPasswordData,
  IRecoveryRequest,
  IResetPasswordRequest,
} from '../../interfaces/auth.interface';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  private _loginService = inject(LoginService);
  private _toastService = inject(ToastService);
  private _navCtrl = inject(NavController);
  private _router = inject(Router);

  showNewPassword: boolean = false;
  username: FormControl = new FormControl('', Validators.required);
  setFocus: boolean = false;
  isLoadingRecoveryPassword: boolean = false;
  isLoadingOtp: boolean = false;
  isLoadingNewPassword: boolean = false;

  isMobile: boolean = false;

  @ViewChild('modal') modal!: IonModal;
  @ViewChild('inputUsernmae', { static: true }) inputUsername!: IonInput;
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  constructor(private platform: Platform){
    this.platform.ready().then(()=>this.isMobile = this.platform.is('android') || this.platform.is('ios'));
  }

  ngOnInit() {}

  recoveryPassword() {
    this.isLoadingRecoveryPassword = true;
    this.showNewPassword = false;
    if (this.username.value === '' || this.username.value === null) {
      this.inputUsername.setFocus();
    } else {
      const usernameData: IRecoveryRequest = {
        username: this.username.value.trim(),
      };
      this._loginService.recovery(usernameData).subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.modal.present();
            this._toastService.showInfo(res.data, Position.Top);
          }
          this.isLoadingRecoveryPassword = false;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingRecoveryPassword = false;
          this._toastService.showError(err.error.message, Position.Top);
        },
      });
    }
  }

  goToLogin() {
    this._router.navigateByUrl('/login');
  }

  validateOtp(codeData: ICodeData) {
    if (codeData.eventClick) {
      this.isLoadingOtp = true;
      const dataCodeOtp: ICodeOtpRequest = {
        username: this.username.value.trim(),
        code: codeData.code,
      };

      this._loginService.sendCodeOTP(dataCodeOtp).subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.showNewPassword = true;
            this.isLoadingOtp = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingOtp = false;
          this._toastService.showError(err.error.message, Position.Top);
        },
      });
    }
  }

  saveNewPassword(event: INewPasswordData) {
    if (event.eventClick) {
      this.isLoadingNewPassword = true;
      const dataNewPassword: IResetPasswordRequest = {
        username: this.username.value.trim(),
        newPassword: event.newPassword,
      };

      this._loginService.reset(dataNewPassword).subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.isLoadingNewPassword = false;
            this._toastService.showSuccess(res.data, Position.Top);
            const navigationOptions: NavigationOptions = {
              animated: true,
            };
            this._navCtrl.navigateRoot('/login', navigationOptions);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingNewPassword = false;
          this._toastService.showError(err.error.message, Position.Top);
        },
      });
      this.modal.dismiss();
      this.username.reset();
    }
  }

  closeModal() {
    this.modal.dismiss();
    this.username.reset();
  }
}
