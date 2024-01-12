import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';

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
  getSummary(): Observable<IGeneralResponse<any>> {
    return this._httpClient.get<IGeneralResponse<any>>(
      `${this.urlBase}/home/visits`
    );
  }
}
