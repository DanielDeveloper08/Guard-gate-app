import { Injectable, inject } from '@angular/core';
import {
  IAddVisitRequest,
  IAddVisitResponse,
  ISendQRRequest,
  IVisit,
  IVisitResponse,
  IVisitorState,
} from '../interfaces/visit.interface';
import { IVisitor } from '../../visitors/interfaces/visitor.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  IGeneralRequestPagination,
  IGeneralResponse,
} from '../../../shared/interfaces/general.interface';
import { QueryBuilderService } from '../../../shared/services/query-builder.service';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;
  private _queryBuilderService = inject(QueryBuilderService);

  visitState: IVisitorState = {
    visitors: [],
    visitConfig: {},
    visitType: '',
  };

  addVisitors(visitor: IVisitor) {
    this.visitState.visitors.unshift(visitor);
  }

  setVisitType(type: string) {
    this.visitState.visitType = type;
  }

  setVisitConfig(config: any) {
    this.visitState.visitConfig = config;
  }

  clearVisitState() {
    this.visitState = {
      visitors: [],
      visitConfig: {},
      visitType: '',
    };
  }

  /**
   * Obtener todas las visitas
   * @param params
   * @returns
   */
  getVisits(
    params?: IGeneralRequestPagination
  ): Observable<IGeneralResponse<IVisitResponse>> {
    const queryParams = this._queryBuilderService.buildQueryParams(params);

    return this._httpClient.get<IGeneralResponse<IVisitResponse>>(
      `${this.urlBase}/visits/${queryParams}`
    );
  }

  /**
   * Obtener visita por id
   * @param params
   * @returns
   */
  getVisitById(
    params?: number
  ): Observable<IGeneralResponse<IVisit>> {
    return this._httpClient.get<IGeneralResponse<IVisit>>(
      `${this.urlBase}/visits/${params}`
    );
  }

  /**
   * Guardar un visita
   * @param params
   * @returns
   */
  saveVisit(
    params: IAddVisitRequest
  ): Observable<IGeneralResponse<IAddVisitResponse>> {
    return this._httpClient.post<IGeneralResponse<IAddVisitResponse>>(
      `${this.urlBase}/visits`,
      params
    );
  }

  /**
   * Enviar códido QR
   * @param params
   * @returns
   */
  sendQRCode(
    params: ISendQRRequest
  ): Observable<IGeneralResponse<any>> {
    return this._httpClient.post<IGeneralResponse<any>>(
      `${this.urlBase}/visits/sendQR`,
      params
    );
  }
}
