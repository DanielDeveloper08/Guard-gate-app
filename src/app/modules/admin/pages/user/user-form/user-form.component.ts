import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOperation, IRole } from '../../../interfaces/role.interface';
import { RoleService } from '../../../services/role.service';
import { ToastService } from 'src/app/shared/services';
import { IGeneralRequestPagination } from 'src/app/shared/interfaces/general.interface';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../services/user.service';
import { Position } from 'src/app/shared/interfaces';
import { IRegisterUserRequest, IUpdateUserRequest, IUser } from '../../../interfaces/user.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private _userService = inject(UserService);
  private _roleService = inject(RoleService);
  private _toastService = inject(ToastService);
  private _formBuilder = inject(FormBuilder);

  userForm!: FormGroup;

  id: string;
  editing: boolean;
  loading:boolean;
  private sub: any;
  roles:IRole[];

  constructor(private route: ActivatedRoute, private router:Router) {
    this.id='';
    this.editing=false;
    this.loading=true;
    this.roles=[];
  }

  ngOnInit() {
    this.createForm();
    this.getRoles();
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       if(Number(this.id)>0){
          this.editing=true;
          this.getUser();
       }else{
        this.loading=false;
       }
    });
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

  getUser() {
    this._userService.getUser(this.id).subscribe({
      next: (res) => {
        this.loading=false;
        this.userForm.patchValue(res.data);
        this.userForm.get('password')?.disable();
      }
    });
  }

  roleSelectAdapter(role: IRole): {optionValue:string, optionName:string} {
    return {optionValue:role.id.toString(), optionName:role.name};
  }

  public registerUser() {
    this._userService.registerUser(
      this.userForm.value
      ).subscribe({
      next: (res) => {
        this.userForm.patchValue(res.data);
        this.editing=true;
        this.userForm.get('password')?.disable();
        this._toastService.showSuccess(res.message, Position.Top);
      },
      error:(err)=>{
        this._toastService.showError(err.error.message, Position.Top);
      }
    });
  }

  public updateUser() {
    const userFormValues=this.userForm.value;

    this._userService.updateUser(
      {
        id:this.id,
        ...userFormValues 
      }).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.message, Position.Top);
      },
      error:(err)=>{
        this._toastService.showError(err.error.message, Position.Top);
      }
    });
  }

  saveChanges(){
    if(!this.userForm.valid){
      return;
    }

    if(Number(this.id)>0){
      this.updateUser();
    }
    else{
      this.registerUser();
    }
  }

  createForm() {
    this.userForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [environment.appConfig.defaultRoleId, Validators.required],
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  controlValueChange(formControl: FormControl, controlName:string) {
    if (this.userForm.get(controlName) !== formControl) {
      this.userForm.setControl(controlName, formControl);
    }
  }
}