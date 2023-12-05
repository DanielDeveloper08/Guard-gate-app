import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { Position } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IRecoveryRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  private _loginService = inject(LoginService);
  private _toastService = inject(ToastService);

  showNewPassword: boolean = false;
  username: FormControl = new FormControl('', Validators.required);
  setFocus: boolean = false;

  @ViewChild('modal') modal!:IonModal;
  @ViewChild('inputUsernmae', { static: true }) inputUsername!: IonInput;
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit() {}

  recoveryPassword() {
    this.showNewPassword = false;
    if(this.username.value === '' || this.username.value === null){
      this.inputUsername.setFocus();
    }else{
      const usernameData: IRecoveryRequest = {
        username: this.username.value.trim()
      }
      this._loginService.recovery(usernameData).subscribe({
        next: (res) => {
          if(res.statusCode == 200){
            this.modal.present();
            this.username.reset();
            this.toastService.showInfo(res.data,Position.Top);
          }
        },
        error: (err:HttpErrorResponse) => {
          this._toastService.showInfo(err.error.message, Position.Top);
        }
      })

      
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  validateOtp(clickContinuar: boolean){
    this.showNewPassword = true;
  }

  setCloseModal(event:boolean){
    this.modal.dismiss();
  }
}
