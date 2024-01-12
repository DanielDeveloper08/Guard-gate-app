import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperation, IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { IResident } from '../../../interfaces/resident.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  private _roleService = inject(RoleService);
  private _toastService = inject(ToastService);

  filterText: string;
  private sub: any;
  residents:IResident[];

  constructor(private route: ActivatedRoute, private router:Router) {
    this.filterText='';
    this.residents=[{
      username: "folea",
      names: "Francesco",
      surnames: "Olea Coppiano",
      email: "francolea@gmail.com",
      phone: "0962746126"
  },
  {
    username: "folea",
    names: "Francesco",
    surnames: "Olea Coppiano",
    email: "francolea@gmail.com",
    phone: "0962746126"
},
{
  username: "folea",
  names: "Francesco",
  surnames: "Olea Coppiano",
  email: "francolea@gmail.com",
  phone: "0962746126"
},
{
  username: "folea",
  names: "Francesco",
  surnames: "Olea Coppiano",
  email: "francolea@gmail.com",
  phone: "0962746126"
},
{
  username: "folea",
  names: "Pedro",
  surnames: "Olea Coppiano",
  email: "francolea@gmail.com",
  phone: "0962746126"
},
{
  username: "user",
  names: "Francesco",
  surnames: "Olea Coppiano",
  email: "francolea@gmail.com",
  phone: "0962746126"
}];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       //this.name = params['name'];
       //this.getRole(this.name);
    });
  }

  filterTextChange(formControl: FormControl) {
    this.filterText=formControl.value;
  }

}