import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitorService } from 'src/app/modules/visitors/services/visitors.service';
import { IonModal } from '@ionic/angular';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';
import { VisitService } from '../../services/visit.service';
import { IAddVisitRequest } from '../../interfaces/visit.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from '../../../../shared/interfaces/toast.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-add-visit-qr',
  templateUrl: './add-visit-qr.component.html',
  styleUrls: ['./add-visit-qr.component.scss'],
})
export class AddVisitQrComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _visitorService = inject(VisitorService);
  private _visitService = inject(VisitService);
  private _router = inject(Router);
  private _toastService = inject(ToastService);
  private _modalService = inject(ModalService);

  @ViewChild('modal') modal!: IonModal;
  user: IUser = JSON.parse(localStorage.getItem('user')!);
  visitForm!: FormGroup;
  selectedVisitors: IVisitor[] = [];
  isOpenDateTime: boolean = false;
  startDateValue!: string;
  startDateSameFormat!: string;
  endDateValue!: string;
  isLoadingVisit: boolean = false;
  initialDate!: string;
  idNewVisit: string = "No existe visita registrada";

  ngOnInit() {
    this.obtenerFechaActualEnFormato();
    this.createForm();
    this.visitForm.valueChanges.subscribe((change) => {
      this.endDateValue = this.calcularFechaFin();
    });

    this._visitorService.listSelectedVisitors.subscribe((visitors) => {
      this.selectedVisitors = visitors;
    });

    this.startDateValue = this.formatDate(this.visitForm.get('startDate')?.value);
    this.endDateValue = this.calcularFechaFin();
  }

  changeVisitors() {
    const filterVisitorsSelected = this.selectedVisitors.filter(
      (visitor) => visitor.isSelected
    );
    this._visitorService.updateListSelectedVisitors(filterVisitorsSelected);
  }

  createForm() {
    this.visitForm = this._formBuilder.group({
      startDate: [ this.initialDate, [Validators.required]],
      validityHours: ['0', [Validators.required]],
      listVisitors: [[], [Validators.required]],
      reason: [""]
    });
  }

  openDateTimeModal() {
    this.isOpenDateTime = true;
  }

  selectedDateTime(value: string) {
    if (value !== '') {
      const fechaFormateada = this.formatDate(value);
      this.startDateValue = fechaFormateada;
      this.startDateSameFormat = value;
      this.visitForm.get('startDate')?.setValue(value);
    }
    this.isOpenDateTime = false;
  }


 private formatDate(value: string | Date = new Date()): string {
  const fecha = new Date(value);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return fecha.toLocaleDateString('es-EC', options);
}

obtenerFechaActualEnFormato = (): string => {
  const nowInEcuador = new Date();
    nowInEcuador.setUTCHours(nowInEcuador.getUTCHours());
    this.initialDate = nowInEcuador.toISOString();
    return nowInEcuador.toISOString();
}




  closeModal() {
    this.modal.dismiss();
  }

  calcularFechaFin(): string {
    const fechaInicio = this.startDateSameFormat ? new Date(this.startDateSameFormat) : new Date();
    const horasValidas = this.visitForm.get('validityHours')?.value;
    const fechaFin = new Date(fechaInicio.getTime() + (horasValidas || 0) * 60 * 60 * 1000);
    return this.formatDate(fechaFin);
  }

  saveVisitQR(){
    const currentDate = new Date();

    const visitData: IAddVisitRequest = {
      type: "QR",
      startDate: this.visitForm.get('startDate')?.value,
      validityHours: this.visitForm.get('validityHours')?.value,
      listVisitors: this.selectedVisitors.map(visitors => visitors.id),
    };

    if (visitData.validityHours == 0) {
      this._toastService.showInfo("Por favor seleccione horas de validez", Position.Top);
      return;
    }

    if(this.visitForm.get('reason')?.value !== ""){
      visitData.reason = this.visitForm.get('reason')?.value
    }

    this.isLoadingVisit = true;
    this._visitService.saveVisit(visitData).subscribe({
      next: (res) => {
        this.isLoadingVisit = false;

        this._router.navigate(["/guard-gate/tabs/visit/success-qr", {
          startDate: this.startDateValue,
          endDate: this.endDateValue,
          idVisita: res.data.id
        }]);
        this.modal.dismiss();
        this._modalService.emitCloseModalEvent();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingVisit = false;
        this._toastService.showError("Ocurrió un error al generar la visita, comunicate con el administardor", Position.Top);
      },
    });
  }

  controlValueReason(formControl: FormControl){
    if (this.visitForm.get('reason') !== formControl) {
      this.visitForm.setControl('reason', formControl);
    }
  }
}
