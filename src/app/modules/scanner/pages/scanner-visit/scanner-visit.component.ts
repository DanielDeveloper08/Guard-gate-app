import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  inject,
} from '@angular/core';
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
import {
  IVisitDetail,
  IVisitorDetail,
} from '../../../visit/interfaces/visit.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { EncryptorService } from 'src/app/shared/services/encryptor.service';
import { VisitStatusEnum } from 'src/app/shared/interfaces/general.interface';
import { IMainHome } from 'src/app/modules/home/interfaces/home.interface';
import { UrbanizationService } from 'src/app/shared/services/urbanization.service';
import { forkJoin } from 'rxjs';

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
  private _cdr = inject(ChangeDetectorRef);
  private _encryptorService = inject(EncryptorService);
  private _urbanizationService = inject(UrbanizationService);

  public isSupported = false;
  public isPermissionGranted = false;
  idVisitScanner!: string;
  visitData!: IVisitDetail | null;
  visitorSelected!: IVisitorDetail | null;
  statusVisit = VisitStatusEnum;
  residence!: IMainHome;

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

    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          this._ngZone.run(() => {
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        }
      );
    });

    this.getVisitById(144);

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

  finish() {
    this.visitData = null;
    this.idVisitScanner = '';
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getVisitById(parseInt(this.idVisitScanner, 10));
      event.target.complete();
    }, 2000);
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
        const dataDecrypt = this._encryptorService.decrypt(
          barcode.displayValue
        );
        if (!dataDecrypt.includes(environment.QR_PREFIX)) {
          this._toast.showError('Código QR no válido', Position.Top);
          return;
        }

        this.idVisitScanner = dataDecrypt.split('-')[1];
        this.getVisitById(parseInt(this.idVisitScanner, 10));
      }
    });
  }

  getVisitById(idVisit: number) {
    const combinedObservables = forkJoin({
      obs1: this._visitService.getVisitById(idVisit),
      obs2: this._urbanizationService.getUrbanization(),
    });

    combinedObservables.subscribe({
      next: (res) => {
        this.visitData = res.obs1.data;
        this.residence = {
          id: 0,
          names: res.obs1.data.generatedBy,
          residence: {
            block: res.obs1.data.block,
            isMain: false,
            personId: 0,
            residencyId: res.obs1.data.idResidency,
            town: res.obs1.data.town,
            urbanization: res.obs2.data.name,
          },
          surnames: '',
        };
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  showFormDetail(visitor: IVisitorDetail, readOnly?: boolean) {
    if (readOnly) visitor.readOnly = true;
    this.visitorSelected = visitor;
    this._cdr.detectChanges();
  }

  resetVisitor(saveData: boolean | void) {
    this.visitorSelected = null;
    saveData && this.getVisitById(parseInt(this.idVisitScanner, 10));
  }
}
