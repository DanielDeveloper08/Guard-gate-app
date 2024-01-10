import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { IUser } from '../../../auth/interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { IResidence } from 'src/app/modules/profile/interfaces/residences';
import { environment } from 'src/environments/environment';
import { VisitService } from '../../services/visit.service';
import { ISendQRRequest } from '../../interfaces/visit.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';

@Component({
  selector: 'success-visit-qr-modal',
  templateUrl: './success-visit-qr.component.html',
  styleUrls: ['./success-visit-qr.component.scss'],
})
export class SuccessVisitQrComponent implements OnInit {
  private _visitService = inject(VisitService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);
  private _loadingController = inject(LoadingController);

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
      this.idNewVisit =
        environment.QR_PREFIX.concat(params['idVisita']) ||
        'No existe visita registrada';
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

  async captureQRCodeImage() {
    if (this.qrcodeImageContainer) {
      const loading = await this.presentLoading();

      html2canvas(this.qrcodeImageContainer.nativeElement).then((canvas) => {
        const base64Image = canvas.toDataURL();
        this.sendQRCode(base64Image, loading);
      });
    }
  }

  sendQRCode(base64: string, loading: HTMLIonLoadingElement) {
    const data: ISendQRRequest = {
      base64Img: base64,
      visitId: parseInt(this.idNewVisit, 10),
    };

    this._visitService.sendQRCode(data).subscribe({
      next: (res) => {
        loading.dismiss();
      },
      error: (err: HttpErrorResponse) => {
        loading.dismiss();
        this._toastService.showError(
          'Error al enviar código QR, inténtalo nuevamente',
          Position.Top
        );
      },
    });
  }

  async presentLoading() {
    const loading = await this._loadingController.create({
      message: 'Enviando código QR a visitantes...',
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loading',
    });
    await loading.present();
    return loading;
  }

  goToListVisits() {
    this._router.navigateByUrl('/guard-gate/tabs/visit/list-visit');
    this.modal.dismiss();
  }

  closeModal() {
    this.isOpenSuccess = false;
  }
}
