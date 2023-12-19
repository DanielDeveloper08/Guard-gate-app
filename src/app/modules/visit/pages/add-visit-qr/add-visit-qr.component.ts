import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { ResidenceService } from '../../../profile/services/residence.service';
import { IMainHome } from 'src/app/modules/home/interfaces/home.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-visit-qr',
  templateUrl: './add-visit-qr.component.html',
  styleUrls: ['./add-visit-qr.component.scss']
})
export class AddVisitQrComponent implements OnInit {
  private _router = inject(Router);
  user: IUser = JSON.parse(localStorage.getItem("user")!);
  private _residenceService = inject(ResidenceService);
  private _formBuilder = inject(FormBuilder);
  mainResidence!: IMainHome;
  visitForm!: FormGroup;

  ngOnInit() {
    this.getResidences();
    this.createForm();
    this.visitForm.valueChanges.subscribe( change => {
      console.log("change", change)
    })
  }

  showVisitors(){
    this._router.navigate(['/guard-gate/tabs/visit/add-visit-qr/visitors', { isVisit: true }]);
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

}
