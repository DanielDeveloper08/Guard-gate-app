import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainResidenceComponent } from '../main-residence/main-residence.component';
import { ResidenceService } from '../../services/residence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../shared/services/toast.service';
import { Position } from '../../../../shared/interfaces/toast.interface';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { RoleTypeEnum } from 'src/app/shared/interfaces/general.interface';
import { Router } from '@angular/router';
import { IResidence } from '../../interfaces/residences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  private _residenceService = inject(ResidenceService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);

  namesUser!: string;

  ngOnInit() {
    this.namesUser = this.getUser();
  }

  async openModalMainResidence() {
    const modal = await this.modalCtrl.create({
      component: MainResidenceComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.setMainResidence(data);
    }
  }

  setMainResidence(resident: IResidence){

    this._residenceService.setMainResidence(resident.residencyId).subscribe({
      next: (res) => {
        // this._router.navigateByUrl("/home");
        this._toastService.showSuccess(res.data, Position.Top);
        localStorage.setItem('mainResidence', JSON.stringify(resident));
      },
      error: (err:HttpErrorResponse) => {
        this._toastService.showError(err.error.message, Position.Top);
      }
    });
  }

  logOut(){
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  isResident(){
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    if(user.role == RoleTypeEnum.RESIDENT){
      return true;
    }

    return false;
  }

  getUser(){
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    return user.names.split(' ')[0] ?? null;
  }

}
