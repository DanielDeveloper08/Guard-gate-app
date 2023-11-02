import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Keyboard } from '@capacitor/keyboard';
import { IonInput } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { LoginRequestI, LoginResponseI } from '../../interfaces/auth.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _loginService = inject(LoginService);
  private _toastService = inject(ToastService);

  signInForm!: FormGroup;
  setFocus: boolean = false;
  

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.validateUsername();
  }

  createForm() {
    this.signInForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validateUsername() {
    this.signInForm.get('username')?.valueChanges.subscribe((change) => {
      const pattern = /^[a-zA-Z0-9\-_.]*$/;
      if (!pattern.test(change)) {
        this.signInForm.get('username')?.setValue(change.slice(0, -1));
      }
    });
  }

  async signIn() {
    const credentials: LoginRequestI = {
      username: this.signInForm.get('username')?.value,
      password: this.signInForm.get('password')?.value,
      ip: '192.168.10.11',
    };

    if (credentials.username === '') {
      this.setFocus = true;
      // await Keyboard.show();
    } else if (credentials.password === '') {
      // this.passwordInput.setFocus();
      // await Keyboard.show();
    } else {
      const response: LoginResponseI | string =
        this._loginService.login(credentials);

      (response as LoginResponseI).nombres
        ? console.log('reedireccionar')
        : this._toastService.showInfo(response as string, Position.Top);
    }
  }
}
