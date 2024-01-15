import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IGeneralRequestDateFilter, IGeneralRequestPagination, IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { QueryBuilderService } from 'src/app/shared/services/query-builder.service';
import { environment } from 'src/environments/environment';
import { IResidentResponse, IResident } from '../interfaces/resident.interface';
import { IDailyVisitsSummary, IVisitsStatusSummary } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _httpClient = inject(HttpClient);
  urlBase: string = environment.URL_API;
  private _queryBuilderService = inject(QueryBuilderService);
constructor() { }

   /**
   * Get the ammount of visits per each status
   * @param params
   * @returns
   */
   getVisitsSUmarized(params?: IGeneralRequestDateFilter): Observable<IGeneralResponse<IVisitsStatusSummary[]>> {
    const queryParams = this._queryBuilderService.buildDateFilterQueryParams(params);

    return this._httpClient.get<IGeneralResponse<IVisitsStatusSummary[]>>(
      `${this.urlBase}/visits-state-summary/${queryParams}`
    );
   }

   /**
   * Get the ammount of visits per day in a date interval
   * @param params
   * @returns
   */
   getDailyVisits(params?: IGeneralRequestDateFilter): Observable<IGeneralResponse<IDailyVisitsSummary[]>> {
    const queryParams = this._queryBuilderService.buildDateFilterQueryParams(params);

    return this._httpClient.get<IGeneralResponse<IDailyVisitsSummary[]>>(
      `${this.urlBase}/visits-date-summary/${queryParams}`
    );
   }

}