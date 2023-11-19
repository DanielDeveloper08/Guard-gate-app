import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Keyboard } from '@capacitor/keyboard';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { LoginRequestI, LoginResponseI } from '../../interfaces/auth.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _loginService = inject(LoginService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _navCtrl = inject(NavController);


  signInForm!: FormGroup;
  setFocusUsername: boolean = false;
  setFocusPassword: boolean = false;
  isLoading: boolean = false;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signInForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  controlValueChangeUsername(formControl: FormControl) {
    if (this.signInForm.get('username') !== formControl) {
      this.signInForm.setControl('username', formControl);
    }
  }

  controlValueChangePassword(formControl: FormControl) {
    if (this.signInForm.get('password') !== formControl) {
      this.signInForm.setControl('password', formControl);
    }
  }

  async signIn() {
    const credentials: LoginRequestI = {
      username: this.signInForm.get('username')?.value,
      password: this.signInForm.get('password')?.value,
      ip: '192.168.10.11',
    };

    if (credentials.username === '') {
      this.setFocusUsername = true;
      // await Keyboard.show();
    } else if (credentials.password === '') {
      this.setFocusPassword = true;
      // await Keyboard.show();
    } else {
      this.isLoading = true;

      const response: LoginResponseI | string =
        this._loginService.login(credentials);

      setTimeout(() => {
        this.isLoading = false;
        (response as LoginResponseI).nombres
          ? this._router.navigateByUrl("/home")
          : this._toastService.showInfo(response as string, Position.Top);
      }, 3000);
    }
  }

  goToRecoveryPassword(){
    const navigationOptions: NavigationOptions = {
      animated: true,
    };
    this._navCtrl.navigateRoot("/recovery-password", navigationOptions);
  }
}
