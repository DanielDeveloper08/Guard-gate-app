import { Injectable, inject } from '@angular/core';
import { IAddVisitRequest, IAddVisitResponse, IVisitorState } from '../interfaces/visit.interface';
import { IVisitor } from '../../visitors/interfaces/visitor.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IGeneralResponse } from '../../../shared/interfaces/general.interface';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private _httpClient = inject(HttpClient);
  private urlBase: string = environment.URL_API;

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
   * Guardar un visita
   * @param params
   * @returns
   */
  saveVisit(params: IAddVisitRequest): Observable<IGeneralResponse<IAddVisitResponse>> {
    return this._httpClient.post<IGeneralResponse<IAddVisitResponse>>(
      `${this.urlBase}/visits`,
      params
    );
  }
}
