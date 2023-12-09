import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainResidenceComponent } from '../main-residence/main-residence.component';
import { ResidenceService } from '../../services/residence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../shared/services/toast.service';
import { Position } from '../../../../shared/interfaces/toast.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  private _residenceService = inject(ResidenceService);
  private _toastService = inject(ToastService);
  
  ngOnInit() {
  }

  async openModalMainResidence() {
    const modal = await this.modalCtrl.create({
      component: MainResidenceComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getResidences(data);
    }
  }

  getResidences(idResidence: number){
    
    this._residenceService.setMainResidence(idResidence).subscribe({
      next: (res) => {
        this._toastService.showSuccess(res.data, Position.Top);
      },
      error: (err:HttpErrorResponse) => {
        this._toastService.showError(err.error.message, Position.Top);
      }
    });
  }

}
