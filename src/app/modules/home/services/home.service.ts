import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';
import { ISummaryResponse } from '../interfaces/home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;

  /**
   * Obtener resumen
   * @param params
   * @returns
   */
  getSummary(): Observable<IGeneralResponse<ISummaryResponse>> {
    return this._httpClient.get<IGeneralResponse<ISummaryResponse>>(
      `${this.urlBase}/home/visits`
    );
  }
}
