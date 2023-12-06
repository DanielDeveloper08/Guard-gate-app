import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Position } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';
import { INewPasswordData } from '../../interfaces/auth.interface';

@Component({
  selector: 'form-new-password',
  templateUrl: './form-new-password.component.html',
  styleUrls: ['./form-new-password.component.scss']
})
export class FormNewPasswordComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _toastService = inject(ToastService);

  passwordForm!: FormGroup;
  setFocusNewPassword: boolean = false;
  setFocusConfirmPassword: boolean = false;
  @Input() isLoading:boolean = false;
  @Output() setNewPassword: EventEmitter<INewPasswordData> = new EventEmitter<INewPasswordData>();

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
        this.setNewPassword.emit({eventClick: true, newPassword: this.passwordForm.get('newPassword')?.value});
      }
    }
  }

}
