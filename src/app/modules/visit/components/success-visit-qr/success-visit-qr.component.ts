import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { IUser } from '../../../auth/interfaces/auth.interface';
import { ResidenceService } from '../../../profile/services/residence.service';
import { IMainHome } from 'src/app/modules/home/interfaces/home.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { IResidence } from 'src/app/modules/profile/interfaces/residences';

@Component({
  selector: 'success-visit-qr-modal',
  templateUrl: './success-visit-qr.component.html',
  styleUrls: ['./success-visit-qr.component.scss'],
})
export class SuccessVisitQrComponent implements OnInit {
  private _residenceService = inject(ResidenceService);
  private _router = inject(Router);

  mainResidence!: IResidence;
  user: IUser = JSON.parse(localStorage.getItem('user')!);
  isOpenSuccess: boolean = false;
  startDateValue!: string;
  endDateValue!: string;
  idNewVisit!: string;
  @ViewChild('visitSuccess') modal!: IonModal;
  @ViewChild('qrcodeImageContainer', { static: false })
  qrcodeImageContainer!: ElementRef<any>;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.startDateValue = params['startDate'];
      this.endDateValue = params['endDate'];
      this.idNewVisit = params['idVisita'] || 'No existe visita registrada';
    });

    this.mainResidence = JSON.parse(localStorage.getItem('mainResidence')!);
  }

  ionViewDidEnter() {
    if (this.modal) {
      this.modal.ionModalDidPresent.subscribe(() => {
        this.captureQRCodeImage();
      });
    }
  }

  captureQRCodeImage() {
    if (this.qrcodeImageContainer) {
      html2canvas(this.qrcodeImageContainer.nativeElement).then((canvas) => {
        const base64Image = canvas.toDataURL();
        console.log(base64Image);
      });
    }
  }

  goToListVisits() {
    this._router.navigateByUrl('/guard-gate/tabs/visit/list-visit');
    this.modal.dismiss();
  }

  closeModal() {
    this.isOpenSuccess = false;
  }
}
