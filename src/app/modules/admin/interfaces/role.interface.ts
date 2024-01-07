import { IGeneralResponsePagination } from "src/app/shared/interfaces/general.interface";

export interface IRole {
    id: number;
    name: string;
    operations: IOperation[];
}

export interface IUpdateRoleRequest {
    name: string;
    operationsIds: number[];
}

export interface IOperation {
    id: number;
    name: string;
    route: string;
    moduleId?: number;
    selected?:boolean;
}

export interface IOperationResponse {
    records: IOperation[];
}

export interface IRoleResponse {
    records: IRole[];
    meta:    IGeneralResponsePagination;
}