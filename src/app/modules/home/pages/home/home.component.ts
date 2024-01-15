import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ResidenceService } from 'src/app/modules/profile/services/residence.service';
import {
  IFrequentVisitor,
  ILastVisitsTransformed,
  IMainHome,
} from '../../interfaces/home.interface';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { HomeService } from '../../services/home.service';
import {
  IVisit,
  IVisitDetail,
} from 'src/app/modules/visit/interfaces/visit.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _residenceService = inject(ResidenceService);
  private _homeService = inject(HomeService);
  private _toastService = inject(ToastService);

  visitors: IFrequentVisitor[] = [];
  pendingVisits: IVisit[] = [];
  lastVisits: ILastVisitsTransformed[] = [];
  mainResidence!: IMainHome;
  userRole!: string;
  isLoadingSummary: boolean = false;
  isLoadingResidences: boolean = false;

  ngOnInit() {
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    this.userRole = user.role;
  }

  ionViewWillEnter() {
    this.getResidences();
    this.getSummaryData();
  }

  getResidences() {
    this.isLoadingResidences = true;
    this._residenceService.getResidencesByUser().subscribe({
      next: (res) => {
        this.isLoadingResidences = false;
        const home: IMainHome = {
          id: res.data.id,
          names: res.data.names,
          surnames: res.data.surnames,
          residence:
            res.data.residences.find((residence) => residence.isMain)! ?? null,
        };
        this.mainResidence = home;
        localStorage.setItem('mainResidence', JSON.stringify(home.residence));
      },
      error: (err: HttpErrorResponse) => {
        this._toastService.showError(
          'Ocurrió un error al cargar la residencia',
          Position.Top
        );
        this.isLoadingResidences = false;
      },
    });
  }

  getSummaryData() {
    this.isLoadingSummary = true;
    this._homeService.getSummary().subscribe({
      next: (res) => {
        this.isLoadingSummary = false;
        this.pendingVisits = res.data.pendingVisits;
        this.visitors = res.data.frequentVisitors;
        this.transformLastVisit(res.data.lastVisits);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingSummary = false;
        this._toastService.showError(
          'Ocurrió un error al cargar el resumen',
          Position.Top
        );
      },
    });
  }

  transformLastVisit(dataVisist: IVisitDetail[]) {
    const lastVisitsData: ILastVisitsTransformed[] = [];
    dataVisist.map((visit) => {
      visit.visitors.map((visitor) => {
        if (visitor.photos && visitor.entryDate) {
          const photo = JSON.parse(visitor.photos)[0];
          lastVisitsData.push({
            reason: visit.reason,
            docNumber: visitor.docNumber,
            entryDate: visitor.entryDate,
            names: visitor.names,
            surnames: visitor.surnames,
            photo: photo,
          });
        }
      });

      this.lastVisits = lastVisitsData;
    });
  }
}
