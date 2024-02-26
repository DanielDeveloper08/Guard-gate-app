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
import { UrbanizationService } from 'src/app/shared/services/urbanization.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _residenceService = inject(ResidenceService);
  private _homeService = inject(HomeService);
  private _toastService = inject(ToastService);
  private _urbanizationService = inject(UrbanizationService);

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

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getResidences();
      this.getSummaryData();
      event.target.complete();
    }, 2000);
  }

  getResidences() {
    const combinedObservables = forkJoin({
      obs1: this._residenceService.getResidencesByUser(),
      obs2: this._urbanizationService.getUrbanization(),
    });

    this.isLoadingResidences = true;
    combinedObservables.subscribe({
      next: (res) => {
        this.isLoadingResidences = false;
        const home: IMainHome = {
          id: res.obs1.data.id,
          names: res.obs1.data.names,
          surnames: res.obs1.data.surnames,
          residence:
            res.obs1.data.residences.find((residence) => residence.isMain)! ??
            null,
        };
        home.residence.urbanization = res.obs2.data.name;
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

  ionViewWillLeave() {
    this.lastVisits = [];
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
