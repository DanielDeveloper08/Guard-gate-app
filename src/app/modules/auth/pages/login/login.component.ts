import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Keyboard } from '@capacitor/keyboard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;

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
    if(this.signInForm.get('username')?.value ===''){
      this.signInForm.get('username')?.markAllAsTouched();
      await Keyboard.show();
    }else if(this.signInForm.get('password')?.value ===''){
      this.signInForm.get('password')?.markAllAsTouched();
      await Keyboard.show();
    }else{
      console.log('login')
    }
  }
}
