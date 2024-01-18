import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services';
import { ResidentService } from '../../../services/resident.service';
import { IResident } from '../../../interfaces/resident.interface';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/user.interface';
import { FormControl } from '@angular/forms';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-edit-resident',
  templateUrl: './edit-resident.component.html',
  styleUrls: ['./edit-resident.component.scss'],
})
export class EditResidentComponent implements OnInit {
  private _userService = inject(UserService);
  private _toastService = inject(ToastService);
  private _activatedRoute = inject(ActivatedRoute);
  idResident!: number;
  userData!: IUser;
  filterText!: string;

  @ViewChild('modal') modal!: IonModal;

  constructor() {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.idResident = params['id'];
    });

    this.getResidentWithHomes();
  }

  getResidentWithHomes() {
    this._userService.getUser(this.idResident.toString()).subscribe({
      next: (res) => {
        this.userData = res.data;
        this.userData.residences = res.data.residences.map((residence,id) => {
          residence.num = id+1;
          return residence;
        })
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  filterTextChange(formControl: FormControl) {
    this.filterText=formControl.value;
  }

  addResidence(){
    this.modal.present();
  }

  closeModal(){
    this.modal.dismiss();
  }
}
