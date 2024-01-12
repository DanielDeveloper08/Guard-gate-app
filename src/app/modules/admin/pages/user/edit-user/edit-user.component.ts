import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperation, IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  private _roleService = inject(RoleService);
  private _toastService = inject(ToastService);

  name: string;
  private sub: any;
  operations:IOperation[];
  role:IRole;

  constructor(private route: ActivatedRoute, private router:Router) {
    this.name='';
    this.operations=[];
    this.role={
      id:0,
      name:'',
      operations:[]
    };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.name = params['name'];
       //this.getRole(this.name);
    });
  }

  getAllOperations() {
    this._roleService.getAllOperations().subscribe({
      next: (res) => {
        if(this.role!=null){
          this.operations = res.data.map(operation=>{
            operation.selected=this.role.operations.find(op=>op.id==operation.id)!=null;
            return operation;
         });
        }else{
          this.router.navigate(['/admin/roles'])
        }
      }
    });
  }

  getRole(roleName:string) {
    this._roleService.getRole(roleName).subscribe({
      next: (res) => {
        this.role = res.data;
        this.getAllOperations();
      },
      error:(err)=>{
        this.router.navigate(['/admin/roles'])
      }
    });
  }

  public updateRole() {
    this._roleService.updateRole(this.role.id,
      {
        name:this.role.name,
        operationsIds:this.operations.filter(x=>x.selected).map(operation=>operation.id)
      }
      ).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.data, Position.Top);
      },
      error:(err)=>{
        this._toastService.showError(err.error.message, Position.Top);
      }
    });
  }

  setSelected(index:number){
    this.operations[index].selected= !this.operations[index].selected;
  }

}