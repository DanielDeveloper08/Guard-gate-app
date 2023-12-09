import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGeneralResponse } from '../../../shared/interfaces/general.interface';
import { IResidencesData } from '../interfaces/residences';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;

  /**
   * Get residences by User Logged
   * @param params
   * @returns
   */
  getResidencesByUser(): Observable<IGeneralResponse<IResidencesData>> {
    return this._httpClient.get<IGeneralResponse<IResidencesData>>(
      `${this.urlBase}/users/residences`
    );
  }

   /**
   * Set main residence
   * @param params
   * @returns
   */
   setMainResidence(idResidence: number): Observable<IGeneralResponse<string>> {
    return this._httpClient.patch<IGeneralResponse<string>>(
      `${this.urlBase}/users/main-residency?residencyId=${idResidence}`,
      {}
    );
  }

}
