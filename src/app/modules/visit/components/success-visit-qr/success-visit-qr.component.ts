import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IUser } from '../../../auth/interfaces/auth.interface';
import { ResidenceService } from '../../../profile/services/residence.service';
import { IMainHome } from 'src/app/modules/home/interfaces/home.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'success-visit-qr-modal',
  templateUrl: './success-visit-qr.component.html',
  styleUrls: ['./success-visit-qr.component.scss']
})
export class SuccessVisitQrComponent implements OnInit {
  private _residenceService = inject(ResidenceService);
  private _router = inject(Router);

  mainResidence!: IMainHome;
  user: IUser = JSON.parse(localStorage.getItem('user')!);
  isOpenSuccess: boolean = false;
  startDateValue!: string;
  endDateValue!: string;
  idNewVisit!: string;
  @ViewChild('visitSuccess') modal!: IonModal;


  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.startDateValue = params["startDate"];
      this.endDateValue = params["endDate"];
      this.idNewVisit = params["idVisita"] || "No existe visita registrada";
    });
    this.getResidences();
  }

  getResidences() {
    this._residenceService.getResidencesByUser().subscribe({
      next: (res) => {
        const home: IMainHome = {
          id: res.data.id,
          names: res.data.names,
          surnames: res.data.surnames,
          residence:
            res.data.residences.find((residence) => residence.isMain)! ?? null,
        };
        this.mainResidence = home;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  goToListVisits(){
    this._router.navigateByUrl('/guard-gate/tabs/visit/list-visit');
    this.modal.dismiss();
  }

  closeModal(){
    this.isOpenSuccess = false;
  }

}
