import { Injectable } from '@angular/core';
import { IVisitorState } from '../interfaces/visit.interface';
import { IVisitor } from '../../visitors/interfaces/visitor.interface';

@Injectable({
  providedIn: 'root',
})
export class VisitService {

  visitState: IVisitorState = {
    visitors: [],
    visitConfig: {},
    visitType: ''
  };

  addVisitors(visitor: IVisitor){
    this.visitState.visitors.unshift(visitor);
  }

  setVisitType(type: string){
    this.visitState.visitType = type;
  }

  setVisitConfig(config: any){
    this.visitState.visitConfig = config;
  }

  clearVisitState() {
    this.visitState = {
      visitors: [],
      visitConfig: {},
      visitType: ''
    };
  }

}
