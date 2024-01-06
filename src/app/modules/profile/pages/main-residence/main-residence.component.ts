import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResidenceService } from '../../services/residence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IResidence } from '../../interfaces/residences';

@Component({
  selector: 'app-main-residence',
  templateUrl: './main-residence.component.html',
  styleUrls: ['./main-residence.component.scss']
})
export class MainResidenceComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  private _residenceService = inject(ResidenceService);
  isLoadingResidences: boolean = false;
  listResidences: IResidence[] = [];

  ngOnInit() {
    this.getResidences();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const mainResidence = this.listResidences.find(residence => residence.isMain );
    return this.modalCtrl.dismiss(mainResidence, 'confirm');
  }

  getResidences(){
    this.isLoadingResidences = true;
    this._residenceService.getResidencesByUser().subscribe({
      next: (res) => {
        this.isLoadingResidences = false;
        this.listResidences = res.data.residences;
      },
      error: (err:HttpErrorResponse) => {
        this.isLoadingResidences = false;
      }
    });
  }

  changeMainResidence(residence: IResidence){
    this.listResidences.forEach(residence=> residence.isMain = false);
    residence.isMain = true;
  }


}
