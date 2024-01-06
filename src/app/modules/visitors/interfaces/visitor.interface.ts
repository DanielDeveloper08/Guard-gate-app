import { IGeneralResponsePagination } from '../../../shared/interfaces/general.interface';
export interface IVisitor {
  id: number;
  names: string;
  surnames: string;
  docNumber: string;
  idResidency: number;
  isSelected?: boolean;
  initials: string;
}

export interface IVisitorResponse {
  records: IVisitor[];
  meta:    IGeneralResponsePagination;
}

export interface IAddVisitorRequest {
  names:     string;
  surnames:  string;
  docNumber: string;
  phone:     string;
}

export interface IEditVisitorRequest {
  names:     string;
  surnames:  string;
  phone:     string;
}


export interface IAddVisitorResponse {
  names:       string;
  surnames:    string;
  docNumber:   string;
  phone:       string;
  residencyId: number;
  updatedAt:   null;
  id:          number;
  createdAt:   Date;
}



