import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IGeneralRequestPagination, IGeneralResponse } from "src/app/shared/interfaces/general.interface";
import { environment } from 'src/environments/environment';
import { IOperation, IOperationResponse, IRole, IRoleResponse, IUpdateRoleRequest } from "../interfaces/role.interface";
import { QueryBuilderService } from "src/app/shared/services/query-builder.service";

@Injectable({
    providedIn:'root'
})
export class RoleService{
    private _httpClient = inject(HttpClient);
    urlBase: string = environment.URL_API;
    private _queryBuilderService = inject(QueryBuilderService);

   /**
   * Get all roles
   * @param params
   * @returns
   */
    getRoles(params: IGeneralRequestPagination): Observable<IGeneralResponse<IRoleResponse>> {
        const queryParams = this._queryBuilderService.buildQueryParams(params);
        return this._httpClient.get<IGeneralResponse<IRoleResponse>>(
            `${this.urlBase}/roles/${queryParams}`
        );
    }

    /**
   * Get role by name
   * @returns
   */
    getRole(roleName:string): Observable<IGeneralResponse<IRole>> {
        return this._httpClient.get<IGeneralResponse<IRole>>(
            `${this.urlBase}/role/${roleName}`
        );
    }

   /**
   * Update role
   * @param roleId
   * @param params
   * @returns
   */
    updateRole(roleId:number, params:IUpdateRoleRequest): Observable<IGeneralResponse<string>> {
        return this._httpClient.put<IGeneralResponse<string>>(
            `${this.urlBase}/roles/${roleId}`,
            params
        );
    }

    /**
   * Get all operations
   * @param params
   * @returns
   */
    getAllOperations(): Observable<IGeneralResponse<IOperation[]>> {
        return this._httpClient.get<IGeneralResponse<IOperation[]>>(
            `${this.urlBase}/operations`
        );
    }
}