import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';
import { Position } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';

@Component({
  selector: 'form-new-password',
  templateUrl: './form-new-password.component.html',
  styleUrls: ['./form-new-password.component.scss']
})
export class FormNewPasswordComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _toastService = inject(ToastService);
  private _navCtrl = inject(NavController);


  passwordForm!: FormGroup;
  setFocusNewPassword: boolean = false;
  setFocusConfirmPassword: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  ngOnInit() {
    this.createForm();
  }

  
  createForm() {
    this.passwordForm = this._formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  controlValueChangeNewPassword(formControl: FormControl) {
    if (this.passwordForm.get('newPassword') !== formControl) {
      this.passwordForm.setControl('newPassword', formControl);
    }
  }

  controlValueChangeConfirmPassword(formControl: FormControl) {
    if (this.passwordForm.get('confirmPassword') !== formControl) {
      this.passwordForm.setControl('confirmPassword', formControl);
    }
  }

  recoveryPassword(){
    if(this.passwordForm.get('newPassword')?.value == ""){
      this.setFocusNewPassword = true;
    }else if(this.passwordForm.get('confirmPassword')?.value == ""){
      this.setFocusConfirmPassword = true;
    }else{
      //VALIDAR SI LAS CONTRASENAS SON IGUALES
      if(this.passwordForm.get('newPassword')?.value != this.passwordForm.get('confirmPassword')?.value){
        this._toastService.showError("Contraseñas no coinciden", Position.Top);
      }else{
        //LLAMAR AL SERVICIO
        this._toastService.showSuccess("Contraseña actualizada exitosamente!",Position.Top);
        const navigationOptions: NavigationOptions = {
          animated: true,
        };
        this.closeModal.emit(true);
        this._navCtrl.navigateRoot("/login", navigationOptions);
      }
    }
  }

}
