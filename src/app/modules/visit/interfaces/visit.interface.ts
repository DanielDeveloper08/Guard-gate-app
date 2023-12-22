import { IVisitor } from '../../visitors/interfaces/visitor.interface';

export interface IVisitorState{
    visitType: string;
    visitors: IVisitor[];
    visitConfig: any;
}

export interface IAddVisitRequest{
    startDate:     string;
    validityHours: number;
    listVisitors:  number[];
    type:          string;
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
