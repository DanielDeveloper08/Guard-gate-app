import { IGeneralResponsePagination } from 'src/app/shared/interfaces/general.interface';

export interface IPersonResponse {
  records: IPerson[];
  meta: IGeneralResponsePagination;
}

export interface IPerson {
  names: string;
  surnames: string;
  email: string;
  phone: string;
  residences: Array<IResidencyByPerson>;
}

export interface IResidencyByPerson {
  id: number;
  block: string;
  town: string;
  urbanization: string;
  isMain: boolean;
}

export interface IResidenceItem {
  names: string;
  surnames: string;
  block: string;
  town: string;
}
