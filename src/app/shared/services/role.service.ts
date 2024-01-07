import { Injectable, inject } from '@angular/core';
import { IRole } from '../interfaces/role.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGeneralResponse } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  urlBase: string = environment.URL_API;
  constructor() {}

}