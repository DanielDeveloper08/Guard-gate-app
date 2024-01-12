import { Component, OnInit } from '@angular/core';
import { IOperation } from 'src/app/shared/interfaces/role.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  operations!: IOperation[];

  constructor() { 
    this.operations = [
      {id:1, name:"Roles", route:"/admin/roles"}, 
      {id:2, name:"Visitas", route:"/admin/visit-dashboard"}, 
      {id:3, name:"Usuarios", route:"/admin/users"},
      {id:4, name:"Residentes", route:"/admin/residents"}
    ];

  }

  ngOnInit() {

  }

}
