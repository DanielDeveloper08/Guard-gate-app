import { IGeneralResponsePagination } from 'src/app/shared/interfaces/general.interface';

export interface IResident {
  id: string;
  username: string;
  names: string;
  surnames: string;
  email: string;
  phone: string;
  role: string;
  roleId: number;
}

export interface IResidentResponse {
  records: IResident[];
  meta: IGeneralResponsePagination;
}
