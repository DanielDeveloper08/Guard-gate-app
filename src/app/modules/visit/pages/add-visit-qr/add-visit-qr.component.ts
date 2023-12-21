import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { ResidenceService } from '../../../profile/services/residence.service';
import { IMainHome } from 'src/app/modules/home/interfaces/home.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorService } from 'src/app/modules/visitors/services/visitors.service';
import { IonModal } from '@ionic/angular';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';

@Component({
  selector: 'app-add-visit-qr',
  templateUrl: './add-visit-qr.component.html',
  styleUrls: ['./add-visit-qr.component.scss'],
})
export class AddVisitQrComponent implements OnInit {
  private _residenceService = inject(ResidenceService);
  private _formBuilder = inject(FormBuilder);
  private _visitorService = inject(VisitorService);

  @ViewChild('modal') modal!: IonModal;
  user: IUser = JSON.parse(localStorage.getItem('user')!);
  mainResidence!: IMainHome;
  visitForm!: FormGroup;
  selectedVisitors: IVisitor[] = [];
  isOpenDateTime: boolean = false;
  startDateValue!: string;
  startDateSameFormat!: string;
  endDateValue!: string;

  ngOnInit() {
    this.getResidences();
    this.createForm();
    this.visitForm.valueChanges.subscribe((change) => {
      console.log('change', change);
    });

    this._visitorService.listSelectedVisitors.subscribe((visitors) => {
      this.selectedVisitors = visitors;
    });

    this.startDateValue = this.visitForm.get('startDate')?.value;
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
      startDate: [this.formatDate(), [Validators.required]],
      validityHours: ['0', [Validators.required]],
      listVisitors: [[], [Validators.required]],
    });
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

  openDateTimeModal() {
    this.isOpenDateTime = true;
  }

  selectedDateTime(value: string) {
    if (value !== '') {
      const fechaFormateada = this.formatDate(value);
      this.startDateValue = fechaFormateada;
      this.startDateSameFormat = value;
      this.visitForm.get('startDate')?.setValue(fechaFormateada);
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
  };
  return fecha.toLocaleDateString('es-ES', options);
}
  

  closeModal() {
    this.modal.dismiss();
  }

  calcularFechaFin(): string {
    console.log("startDate", this.startDateSameFormat)
    const fechaInicio = new Date(this.startDateSameFormat);
    const horasValidas = this.visitForm.get('validityHours')?.value;
    const fechaFin = new Date(fechaInicio.getTime() + horasValidas * 60 * 60 * 1000);
    return this.formatDate(fechaFin);
  }
}
