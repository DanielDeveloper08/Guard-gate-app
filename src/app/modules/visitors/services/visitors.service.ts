import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IGeneralRequestPagination,
  IGeneralResponse,
} from '../../../shared/interfaces/general.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IAddVisitorRequest,
  IAddVisitorResponse,
  IVisitor,
  IVisitorResponse,
} from '../interfaces/visitor.interface';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;
  listSelectedVisitors: BehaviorSubject<IVisitor[]> = new BehaviorSubject<IVisitor[]>([]);

  /**
   * Obtener todos los visitantes registrados
   * @param params
   * @returns
   */
  getVisitors(
    params?: IGeneralRequestPagination
  ): Observable<IGeneralResponse<IVisitorResponse>> {
    const queryParams = this.buildQueryParams(params);

    return this._httpClient.get<IGeneralResponse<IVisitorResponse>>(
      `${this.urlBase}/visitors/${queryParams}`
    );
  }

  /**
   * Guardar un visitante
   * @param params
   * @returns
   */
  saveVisitors(
    params: IAddVisitorRequest
  ): Observable<IGeneralResponse<IAddVisitorResponse>> {
    return this._httpClient.post<IGeneralResponse<IAddVisitorResponse>>(
      `${this.urlBase}/visitors`,
      params
    );
  }

  private buildQueryParams(params?: IGeneralRequestPagination): string {
    const queryParts: string[] = [];

    if (params?.search) {
      queryParts.push(`search=${params.search}`);
    }
    if (params?.limit) {
      queryParts.push(`limit=${params.limit}`);
    }
    if (params?.page) {
      queryParts.push(`page=${params.page}`);
    }

    return queryParts.length > 0 ? '?' + queryParts.join('&') : '';
  }

  updateListSelectedVisitors(listVisitor: IVisitor[]){
    this.listSelectedVisitors.next(listVisitor);
  }
}
