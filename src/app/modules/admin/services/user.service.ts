import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IGeneralRequestPagination, IGeneralResponse } from "src/app/shared/interfaces/general.interface";
import { environment } from 'src/environments/environment';
import { IOperation, IOperationResponse, IRole, IRoleResponse, IUpdateRoleRequest } from "../interfaces/role.interface";
import { QueryBuilderService } from "src/app/shared/services/query-builder.service";
import { IRegisterUserRequest, IUpdateUserRequest, IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn:'root'
})
export class UserService{
    private _httpClient = inject(HttpClient);
    urlBase: string = environment.URL_API;
    private _queryBuilderService = inject(QueryBuilderService);

   /**
   * Get all roles
   * @param params
   * @returns
   */
    registerUser(params: IRegisterUserRequest): Observable<IGeneralResponse<IUser>> {
        return this._httpClient.post<IGeneralResponse<IUser>>(
            `${this.urlBase}/auth/register`,
            params
        );
    }

    /**
   * Get user by id
   * @param userId
   * @returns
   */
    getUser(userId:string): Observable<IGeneralResponse<IUser>> {
        return this._httpClient.get<IGeneralResponse<IUser>>(
            `${this.urlBase}/users/${userId}`
        );
    }

   /**
   * Update role
   * @param roleId
   * @param params
   * @returns
   */
    updateUser(params:IUpdateUserRequest): Observable<IGeneralResponse<IUser>> {
        return this._httpClient.put<IGeneralResponse<IUser>>(
            `${this.urlBase}/auth/update`,
            params
        );
    }

    /**
   * Get all users
   * @returns
   */
    getAllUsers(): Observable<IGeneralResponse<IUser[]>> {
        return this._httpClient.get<IGeneralResponse<IUser[]>>(
            `${this.urlBase}/users`
        );
    }

    /**
   * Get all resident users
   * @returns
   */
    getAllResidentUsers(): Observable<IGeneralResponse<IUser[]>> {
        return this._httpClient.get<IGeneralResponse<IUser[]>>(
            `${this.urlBase}/users/residents`
        );
    }
}