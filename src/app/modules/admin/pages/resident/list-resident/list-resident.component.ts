import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperation, IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { IResident } from '../../../interfaces/resident.interface';
import { FormControl } from '@angular/forms';
import { ResidentService } from '../../../services/resident.service';

@Component({
  selector: 'app-list-resident',
  templateUrl: './list-resident.component.html',
  styleUrls: ['./list-resident.component.scss']
})
export class ListResidentComponent implements OnInit {

  private _roleService = inject(RoleService);
  private _toastService = inject(ToastService);
  private _residentService = inject(ResidentService);


  filterText: string;
  private sub: any;
  residents:IResident[]=[];

  constructor(private route: ActivatedRoute, private router:Router) {
    this.filterText='';
    this.residents=[];
  }

  ngOnInit() {

    this.getRedicents();
    this.sub = this.route.params.subscribe(params => {
       //this.name = params['name'];
       //this.getRole(this.name);
    });
  }

  filterTextChange(formControl: FormControl) {
    this.filterText=formControl.value;
  }

  getRedicents(){
    this._residentService.getResidents().subscribe({
      next: (res) => {
        this.residents = res.data;
        console.log(res.data)
      }
    });
  }

}