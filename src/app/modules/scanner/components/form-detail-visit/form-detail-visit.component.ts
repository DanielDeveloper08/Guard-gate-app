import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';
import {
  ISaveDetailVisitRequest,
  IVisit,
} from 'src/app/modules/visit/interfaces/visit.interface';
import { io } from 'socket.io-client';
import { VisitService } from 'src/app/modules/visit/services/visit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Position } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';

@Component({
  selector: 'form-detail-visit',
  templateUrl: './form-detail-visit.component.html',
  styleUrls: ['./form-detail-visit.component.scss'],
})
export class FormDetailVisitComponent implements OnInit {
  @Input() idVisit!: IVisit | null;
  @Input() visitor!: IVisitor | null;
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();

  private _visitService = inject(VisitService);
  private _formBuilder = inject(FormBuilder);
  private _scannerService = inject(CameraService);
  private _toastService = inject(ToastService);
  private _cameraService = inject(CameraService);

  photos: string[] = [];
  visitorSelected!: IVisitor;
  isLoadingSaveDetail: boolean = false;
  isLoadingImage: boolean = false;

  @ViewChild('modal') modal!: IonModal;
  detailVisitForm!: FormGroup;

  ngAfterViewInit() {
    this.modal.ionModalDidDismiss.subscribe(() => {
      this.reset.emit();
    });
  }

  constructor() {}

  ngOnInit() {
    this.createForm();
    this._scannerService.photos$.subscribe(data=>{
      this.photos = data;
    });
    this._cameraService.isLoadingImage.subscribe(value => {
      console.log("IS LOADING", value)
      this.isLoadingImage = value;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['visitor']?.currentValue != null) {
      this.visitorSelected = changes['visitor']?.currentValue;
    }
  }

  /**
   * Crear formulario.
   */
  createForm() {
    this.detailVisitForm = this._formBuilder.group({
      observation: ['', [Validators.required]],
      carPlate: ['', [Validators.required]],
    });
  }

  controlValueChangeObservation(formControl: FormControl) {
    this.detailVisitForm.setControl('observation', formControl);
  }

  controlValueChangeCarPlate(formControl: FormControl) {
    this.detailVisitForm.setControl('carPlate', formControl);
  }

  closeModalVisitors() {
    this._scannerService.resetPhotos();
    this.modal.dismiss();
    this.reset.emit();
  }

  async takePhoto() {
    await this._scannerService.addNewPhoto();
    this.showErrorImages = false;
  }

  showErrorImages: boolean = false;

  saveDetail() {
    this.isLoadingSaveDetail = true;

    if (this.photos.length === 0) {
      this.showErrorImages = true;
      return;
    }

    const dataSave: ISaveDetailVisitRequest = {
      visitId: this.idVisit?.id!,
      visitorId: this.visitor?.id!,
      photos: this.photos,
    };

    this.addCarPlateAndObservation(dataSave);

    this._visitService.saveDetailVisit(dataSave).subscribe({
      next: (res) => this.handleSaveSuccess(),
      error: (err: HttpErrorResponse) => this.handleSaveError(),
    });
  }

  private addCarPlateAndObservation(dataSave: ISaveDetailVisitRequest): void {
    const carPlateValue = this.detailVisitForm.get('carPlate')?.value;
    const observationValue = this.detailVisitForm.get('observation')?.value;

    if (carPlateValue) {
      dataSave.carPlate = carPlateValue;
    }

    if (observationValue) {
      dataSave.observation = observationValue;
    }
  }

  private handleSaveSuccess(): void {
    this.isLoadingSaveDetail = false;
    this.closeModalVisitors();
  }

  private handleSaveError(): void {
    this.isLoadingSaveDetail = false;
    this._toastService.showError(
      'Ocurrió un error al guardar detalle, comunícate con el administrador',
      Position.Top
    );
  }
}
