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
    this.operations = [{id:1, name:"Roles", route:""}, {id:2, name:"Visitas", route:""}]

  }

  ngOnInit() {

  }

}
