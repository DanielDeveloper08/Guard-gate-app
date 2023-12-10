import { Injectable, inject } from '@angular/core';
import {
  ICodeOtpRequest,
  ILoginRequest,
  ILoginResponse,
  IRecoveryRequest,
  IResetPasswordRequest,
} from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  urlBase: string = environment.URL_API;
  constructor() {}

  /**
   * Login
   * @param params
   * @returns
   */
  signIn(params: ILoginRequest): Observable<IGeneralResponse<ILoginResponse>> {
    return this._httpClient.post<IGeneralResponse<ILoginResponse>>(
      `${this.urlBase}/auth/login`,
      params
    );
  }

  /**
   * Recovery password
   * @param params
   * @returns
   */
  recovery(params: IRecoveryRequest): Observable<IGeneralResponse<string>> {
    return this._httpClient.post<IGeneralResponse<string>>(
      `${this.urlBase}/auth/recover-password`,
      params
    );
  }

  /**
   * Send code otp
   * @param params
   * @returns
   */
  sendCodeOTP(params: ICodeOtpRequest): Observable<IGeneralResponse<string>> {
    return this._httpClient.post<IGeneralResponse<string>>(
      `${this.urlBase}/auth/validate-otp`,
      params
    );
  }

  /**
   * Reset password
   * @param params
   * @returns
   */
  reset(params: IResetPasswordRequest): Observable<IGeneralResponse<string>> {
    return this._httpClient.post<IGeneralResponse<string>>(
      `${this.urlBase}/auth/reset-password`,
      params
    );
  }

  logout(){
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
  
}

