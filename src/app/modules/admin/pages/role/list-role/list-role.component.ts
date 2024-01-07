import { Component, inject } from '@angular/core';
import { IGeneralRequestPagination } from 'src/app/shared/interfaces/general.interface';
import { IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent {
  roles:IRole[];
  private _roleService = inject(RoleService);

  constructor(){
    this.roles=[]
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    const queryParams: IGeneralRequestPagination = {
      limit: 1000,
    };

    this._roleService.getRoles(queryParams).subscribe({
      next: (res) => {
        this.roles = res.data.records;
      }
    });
  }
}