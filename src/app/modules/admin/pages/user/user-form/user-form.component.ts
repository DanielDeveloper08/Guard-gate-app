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
import { materialize } from 'rxjs';

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
  roleOptions:{optionValue:string , optionName:string}[];
  nameRegex:string='^[a-zA-Z]+(?:\\s[a-zA-Z]+)*\\s?$';
  fullEmailRegex:string='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  passwordRegex:string='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

  constructor(private route: ActivatedRoute, private router:Router) {
    this.id='';
    this.editing=false;
    this.loading=true;
    this.roleOptions=[];
  }

  ngOnInit() {
    this.createForm();
    this.getRoles();
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       if(this.id){
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
        this.roleOptions = res.data.records.map((role) => (
          {optionValue:role.id.toString(), optionName:role.name}
        ));
      }
    });
  }

  getUser() {
    this._userService.getUser(this.id).subscribe({
      next: (res) => {
        this.loading=false;
        this.userForm.patchValue(res.data);
        this.userForm.get('password')?.disable();
        this.userForm.get('passwordConfirm')?.disable();
      },
      error:(err)=>{
        this.router.navigate(['/admin/users'])
      }
    });
  }

  public registerUser() {
    this._userService.registerUser(
      this.userForm.value
      ).subscribe({
      next: (res) => {
        this.userForm.patchValue(res.data);
        this.editing=true;
        this.userForm.get('password')?.disable();
        this.userForm.get('passwordConfirm')?.disable();
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
    if(!this.validateForm()){
      return;
    }

    this.userForm.get('passwordConfirm')?.disable();

    if(this.editing){
      this.updateUser();
    }
    else{
      this.registerUser();
    }
  }

  validateForm():boolean{
    const passwordRegExp = new RegExp(this.passwordRegex);
    if (!passwordRegExp.test(this.userForm.get('password')?.value) && !this.editing) {
      this._toastService.showError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter especial.', Position.Top);
      return false;
    }

    if(this.userForm.get('passwordConfirm')?.value!=this.userForm.get('password')?.value && !this.editing){
      this._toastService.showError('Las contraseñas no coinciden.', Position.Top);
      return false;
    }

    if(!this.userForm.valid){
      this._toastService.showError('Debe llenar todos los campos correctamente.', Position.Top);
      return false;
    }

    const emailRegExp = new RegExp(this.fullEmailRegex);
    if (!emailRegExp.test(this.userForm.get('email')?.value)) {
      this._toastService.showError('Debe ingresar un email válido.', Position.Top);
      return false;
    }

    return true;
  }

  createForm() {
    this.userForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
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