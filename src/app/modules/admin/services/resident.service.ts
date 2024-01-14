import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralRequestPagination, IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { QueryBuilderService } from 'src/app/shared/services/query-builder.service';
import { environment } from 'src/environments/environment';
import { IResidentResponse, IResident } from '../interfaces/resident.interface';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private _httpClient = inject(HttpClient);
  urlBase: string = environment.URL_API;
  private _queryBuilderService = inject(QueryBuilderService);
constructor() { }

   /**
   * Get all residents
   * @param params
   * @returns
   */
   getResidents(): Observable<IGeneralResponse<IResident[]>> {
    return this._httpClient.get<IGeneralResponse<IResident[]>>(
        `${this.urlBase}/role-users/1`
    );
}


}
