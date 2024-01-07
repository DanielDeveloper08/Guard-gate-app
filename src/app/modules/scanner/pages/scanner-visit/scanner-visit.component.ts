import { Component, NgZone, OnInit, inject } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { ScannerSharedComponent } from 'src/app/shared/components/scanner/scanner.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import {
  Barcode,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { AlertService, ToastService } from 'src/app/shared/services';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Position } from 'src/app/shared/interfaces';
import { VisitService } from '../../../visit/services/visit.service';
import { IVisit } from '../../../visit/interfaces/visit.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner-visit.component.html',
  styleUrls: ['./scanner-visit.component.scss'],
})
export class ScannerVisitComponent implements OnInit {
  private _modalService = inject(ModalService);
  private _ngZone = inject(NgZone);
  private _toast = inject(ToastService);
  private _visitService = inject(VisitService);

  public isSupported = false;
  public isPermissionGranted = false;
  idVisitScanner!: string;
  visitData!: IVisit;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    this.getVisitorById(5);

    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          this._ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        }
      );
    });

    this.checkAndRequestPermissions();

    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
  }

  private async checkAndRequestPermissions(): Promise<void> {
    const result = await BarcodeScanner.checkPermissions();

    if (result.camera !== 'granted') {
      await this.requestPermissions();
    }
  }

  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }

  public async startScan(): Promise<void> {
    const element = await this._modalService.showModal({
      component: ScannerSharedComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        if (!barcode.displayValue.includes(environment.QR_PREFIX)) {
          this._toast.showError('Código QR no válido', Position.Top);
          return;
        }

        this.idVisitScanner = barcode.displayValue.split('-')[1];
        this.getVisitorById(parseInt(this.idVisitScanner, 10));
      }
    });
  }

  getVisitorById(idVisit: number) {
    this._visitService.getVisitById(idVisit).subscribe({
      next: (res) => {
        // this.isLoadingVisit = false;
        this.visitData = res.data;
      },
      error: (err: HttpErrorResponse) => {
        // this.isLoadingVisit = false;
      },
    });
  }
}
