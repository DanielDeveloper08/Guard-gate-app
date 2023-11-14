import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { Position } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
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
      this.modal.present();
      this.username.reset();
      this.toastService.showInfo("Correo enviado exitosamente",Position.Top);
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
