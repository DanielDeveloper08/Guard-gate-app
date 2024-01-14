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
import domtoimage from 'dom-to-image';
import { IResidence } from 'src/app/modules/profile/interfaces/residences';
import { environment } from 'src/environments/environment';
import { VisitService } from '../../services/visit.service';
import { ISendQRRequest } from '../../interfaces/visit.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { StorageService } from 'src/app/shared/services/storage.service';
import { EncryptorService } from 'src/app/shared/services/encryptor.service';

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
  private _storageService = inject(StorageService);
  private _encryptorService = inject(EncryptorService);

  mainResidence!: IResidence;
  user: IUser = JSON.parse(localStorage.getItem('user')!);
  isOpenSuccess: boolean = false;
  startDateValue!: string;
  endDateValue!: string;
  idNewVisit!: string;
  idEncryptNewVisit!: string;
  @ViewChild('visitSuccess') modal!: IonModal;
  @ViewChild('qrcodeImageContainer', { static: false })
  qrcodeImageContainer!: ElementRef<any>;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.startDateValue = params['startDate'];
      this.endDateValue = params['endDate'];
      const idVisitNewVIsit = environment.QR_PREFIX.concat(params['idVisita']);
      this.idEncryptNewVisit = this._encryptorService.encrypt(idVisitNewVIsit);
      this.idNewVisit = idVisitNewVIsit || 'No existe visita registrada';
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

      domtoimage
        .toBlob(this.qrcodeImageContainer.nativeElement)
        .then(async (blob) => {
          const fileName = 'qr_code.png';
          const lastModified = new Date().getTime();
          const fileType = blob.type;

          const file = new File([blob], fileName, {
            lastModified,
            type: fileType,
          });
          const URLImage = await this._storageService.uploadStorage(
            file,
            'qr-codes',
            `qr-${this.idNewVisit}`
          );

          this.sendQRCodeImageFile(URLImage!, loading);
        })
        .catch((error) => {
          console.error('Error al capturar la imagen:', error);
        });
    }
  }

  sendQRCodeImageFile(url: string, loading: HTMLIonLoadingElement) {
    const data: ISendQRRequest = {
      imgUrl: url,
      visitId: Number(this.idNewVisit.split('-')[1]),
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
