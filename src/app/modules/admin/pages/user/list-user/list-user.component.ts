import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperation, IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { FormControl } from '@angular/forms';
import { IUser } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  private _userService = inject(UserService);
  private _toastService = inject(ToastService);

  filterText: string;
  private sub: any;
  users:IUser[];

  constructor(private route: ActivatedRoute, private router:Router) {
    this.filterText='';
    this.users=[];
  }

  ngOnInit() {
    this.getUsers();
  }

  filterTextChange(formControl: FormControl) {
    this.filterText=formControl.value;
  }

  gotoAddUser(){
    this.router.navigate(['admin/user']);
  }

  getUsers() {
    this._userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      }
    });
  }

}