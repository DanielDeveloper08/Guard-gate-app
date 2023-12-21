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
  styleUrls: ['./add-visit-qr.component.scss']
})
export class AddVisitQrComponent implements OnInit {
  private _residenceService = inject(ResidenceService);
  private _formBuilder = inject(FormBuilder);
  private _visitorService = inject(VisitorService);

  @ViewChild('modal') modal!: IonModal;
  user: IUser = JSON.parse(localStorage.getItem("user")!);
  mainResidence!: IMainHome;
  visitForm!: FormGroup;
  selectedVisitors: IVisitor[]=[];
  

  ngOnInit() {
    this.getResidences();
    this.createForm();
    this.visitForm.valueChanges.subscribe( change => {
    })

    this._visitorService.listSelectedVisitors.subscribe( visitors => {
      this.selectedVisitors = visitors;
    })
  }

  changeVisitors(){
    const filterVisitorsSelected = this.selectedVisitors.filter(
      (visitor) => visitor.isSelected
    );
    this._visitorService.updateListSelectedVisitors(filterVisitorsSelected);
  }

  createForm() {
    this.visitForm = this._formBuilder.group({
      startDate: ["" , [Validators.required]],
      validityHours: ["" , [Validators.required]],
      listVisitors: [[], [Validators.required]],
    });
  }

  getResidences(){
    this._residenceService.getResidencesByUser().subscribe({
      next: (res) => {
        const home: IMainHome = {
          id: res.data.id,
          names: res.data.names,
          surnames: res.data.surnames,
          residence: res.data.residences.find(residence => residence.isMain)! ?? null,
        }
        this.mainResidence = home;
      },
      error: (err:HttpErrorResponse) => {
      }
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
