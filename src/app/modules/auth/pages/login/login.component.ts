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
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';
import { ILoginRequest } from '../../interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';

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

  isMobile: boolean = false;

  constructor(private platform: Platform){
    this.platform.ready().then(()=>this.isMobile = this.platform.is('android') || this.platform.is('ios'));
  }

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
    this.isLoading = true;
    const credentials: ILoginRequest = {
      username: this.signInForm.get('username')?.value,
      password: this.signInForm.get('password')?.value,
    };

    if (credentials.username === '') {
      this.setFocusUsername = true;
      // await Keyboard.show();
    } else if (credentials.password === '') {
      this.setFocusPassword = true;
      // await Keyboard.show();
    } else {
      this._loginService.signIn(credentials).subscribe({
        next: (res) => {
          if (res.data.user) {
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this._router.navigateByUrl('/guard-gate');
            this.isLoading = false;
          }
        },
        error: (err:any) => {
          this.isLoading = false;
          this._toastService.showError(err.error.message, Position.Top);
        }
      });
    }
  }

  goToRecoveryPassword() {
    const navigationOptions: NavigationOptions = {
      animated: true,
    };
    this._navCtrl.navigateRoot('/recovery-password', navigationOptions);
  }
}
