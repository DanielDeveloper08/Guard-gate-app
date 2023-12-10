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