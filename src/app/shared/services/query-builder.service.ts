import { Injectable } from '@angular/core';
import { IGeneralRequestPagination } from '../interfaces/general.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

constructor() { }

public buildQueryParams(params?: IGeneralRequestPagination): string {
  const queryParts: string[] = [];

  if (params?.search) {
    queryParts.push(`search=${params.search}`);
  }
  if (params?.limit) {
    queryParts.push(`limit=${params.limit}`);
  }
  if (params?.page) {
    queryParts.push(`page=${params.page}`);
  }

  return queryParts.length > 0 ? '?' + queryParts.join('&') : '';
}

}
