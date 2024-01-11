import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IGeneralRequestPagination,
  IGeneralResponse,
} from '../../../shared/interfaces/general.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { QueryBuilderService } from '../../../shared/services/query-builder.service';
import {
  IAddVisitorRequest,
  IAddVisitorResponse,
  IEditVisitorRequest,
  IVisitor,
  IVisitorResponse,
} from '../interfaces/visitor.interface';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;
  private _queryBuilderService = inject(QueryBuilderService);
  listSelectedVisitors: BehaviorSubject<IVisitor[]> = new BehaviorSubject<
    IVisitor[]
  >([]);

  /**
   * Obtener todos los visitantes registrados
   * @param params
   * @returns
   */
  getVisitors(
    params?: IGeneralRequestPagination
  ): Observable<IGeneralResponse<IVisitorResponse>> {
    const queryParams = this._queryBuilderService.buildQueryParams(params);

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

  /**
   * Editar un visitante
   * @param params
   * @returns
   */
  editVisitor(
    params: IEditVisitorRequest,
    idVisitor: number
  ): Observable<IGeneralResponse<any>> {
    return this._httpClient.put<IGeneralResponse<any>>(
      `${this.urlBase}/visitors/${idVisitor}`,
      params
    );
  }

  /**
   * Obtener visitante por id
   * @param params
   * @returns
   */
  getVisitorById(
    params?: number
  ): Observable<IGeneralResponse<IAddVisitorResponse>> {
    return this._httpClient.get<IGeneralResponse<IAddVisitorResponse>>(
      `${this.urlBase}/visitors/${params}`
    );
  }

  /**
   * Eliminar un visitante
   * @param params
   * @returns
   */
  deleteVisitor(idVisitor: number): Observable<IGeneralResponse<any>> {
    return this._httpClient.patch<IGeneralResponse<any>>(
      `${this.urlBase}/visitors/${idVisitor}`,
      {}
    );
  }

  updateListSelectedVisitors(listVisitor: IVisitor[]) {
    this.listSelectedVisitors.next(listVisitor);
  }
}
