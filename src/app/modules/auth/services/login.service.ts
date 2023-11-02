import { Injectable } from '@angular/core';
import { LoginRequestI, LoginResponseI } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user: string = 'dasanza79';
  private pass: string = 'test123';

  constructor() {}

  login(loginRequest: LoginRequestI): LoginResponseI | string {
    
    if (
      loginRequest.username != this.user &&
      loginRequest.password != this.pass
    ) {
      return 'Usuario o contraseña incorrecta';
    }

    return {
      usuario: 'dasanza79',
      apellidos: 'Asanza Erazo',
      correo: 'dasanza79@gmail.com',
      nombres: 'Daniel Steven',
    };
  }
}
