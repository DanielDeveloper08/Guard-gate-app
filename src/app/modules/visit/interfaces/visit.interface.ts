import { IVisitor } from '../../visitors/interfaces/visitor.interface';
import { IGeneralResponsePagination } from '../../../shared/interfaces/general.interface';

export interface IVisitorState{
    visitType: string;
    visitors: IVisitor[];
    visitConfig: any;
}

export interface IVisitResponse {
    records: IVisit[];
    meta:    IGeneralResponsePagination;
}

export interface IVisit {
    id:            number;
    startDate:     string;
    endDate:       string;
    validityHours: number;
    reason:        string;
    type:          string;
    visitors:      IVisitor[];
}

export interface IAddVisitRequest{
    startDate:     string;
    validityHours: number;
    listVisitors:  number[];
    type:          string;
    reason?:       string;
}


export interface IAddVisitResponse {
    startDate:     string;
    validityHours: string;
    typeVisitId:   number;
    residencyId:   number;
    statusId:      number;
    updatedAt:     string;
    endDate:       string;
    reason:        string;
    id:            number;
    createdAt:     string;
}

export interface ISendQRRequest{
    visitId: number;
    imgUrl: string;
}

export interface ISaveDetailVisitRequest{
    visitId:     number;
    visitorId:   number;
    observation?:string;
    carPlate?:   string;
    photos:      string[];
}