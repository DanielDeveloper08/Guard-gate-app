export interface IGeneralResponse<T> {
    statusCode: number;
    message:    string;
    data:       T;
}


export enum RoleTypeEnum {
    ADMIN = 'ADMINISTRADOR',
    RESIDENT = 'RESIDENTE',
    OPERATIONAL = 'OPERATIVO',
}

export interface IGeneralResponsePagination {
    page:         number;
    totalPages:   number;
    totalRecords: number;
  }

  export interface IGeneralRequestPagination{
    limit?: number;
    page?: number;
    search?: string;
  }
  