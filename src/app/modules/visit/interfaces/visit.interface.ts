import { IVisitor } from '../../visitors/interfaces/visitor.interface';
import { IGeneralResponsePagination } from '../../../shared/interfaces/general.interface';

export interface IVisitorState{
    visitType: string;
    visitors: IVisitor[];
    visitConfig: any;
}

export interface IVisitResponse {
    records: IVisitDetail[];
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

export interface IVisitDetail{
    id:            number;
    startDate:     string;
    endDate:       string;
    validityHours: number;
    reason:        string;
    generatedBy:   string;
    status:        string;
    idResidency:   number;
    type:          string;
    visitors:      IVisitorDetail[];
    message:       string;
}

export interface IVisitorDetail{
    id:          number;
    names:       string;
    surnames:    string;
    docNumber:   string;
    phone:       string;
    status:      boolean;
    idResidency: number;
    hasEntered:  boolean;
    entryDate:   null | string;
    carPlate:    null | string;
    observation: null | string;
    photos:      string;

    readOnly:    boolean;
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
    hasEntered:  boolean;
    observation?:string;
    carPlate?:   string;
    photos:      string[];
}