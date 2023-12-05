import { Injectable, inject } from '@angular/core';
import { ILoginRequest, ILoginResponse, IRecoveryRequest } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _httpClient = inject(HttpClient);
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
}
