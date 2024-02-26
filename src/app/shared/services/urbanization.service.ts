import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGeneralResponse } from '../interfaces/general.interface';
import { Observable } from 'rxjs';
import { IUrbanizationResponse } from '../interfaces/urbanization';

@Injectable({
  providedIn: 'root',
})
export class UrbanizationService {
  private _httpClient = inject(HttpClient);
  urlBase: string = environment.URL_API;

  getUrbanization(): Observable<IGeneralResponse<IUrbanizationResponse>> {
    return this._httpClient.get<IGeneralResponse<IUrbanizationResponse>>(
      `${this.urlBase}/urbanization/1`
    );
  }
}
