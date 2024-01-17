import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';
import { IPerson, IPersonResponse } from '../interfaces/residences.interface';

@Injectable({
  providedIn: 'root',
})
export class ResidencePersonaService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;

  constructor() {}
  /**
   * Obtener todas residencias con sus casas
   * @param params
   * @returns
   */
  getAllResidences(): Observable<IGeneralResponse<IPersonResponse>> {
    return this._httpClient.get<IGeneralResponse<IPersonResponse>>(
      `${this.urlBase}/persons`
    );
  }
}
