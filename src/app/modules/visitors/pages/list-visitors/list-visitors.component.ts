import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterEvent } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { IVisitor } from '../../interfaces/visitor.interface';
import { FormControl, Validators } from '@angular/forms';
import { VisitorService } from '../../services/visitors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs';
import { IGeneralRequestPagination } from '../../../../shared/interfaces/general.interface';

@Component({
  selector: 'app-list-visitors',
  templateUrl: './list-visitors.component.html',
  styleUrls: ['./list-visitors.component.scss'],
})
export class ListVisitorsComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  filterInput: FormControl = new FormControl('', Validators.required);
  isNewVisit: boolean = false;
  isLoadingVisitors: boolean = false;
  private _visitorService = inject(VisitorService);
  listVisitors: IVisitor[] = [];

  ngOnInit() {
    this.getVisitors();
    this.handleRouteParams();
  }

  private handleRouteParams() {
    this._activatedRoute.paramMap.subscribe(
      (params) => (this.isNewVisit = params.get('isVisit') === 'true')
    );
  }

  private initializeVisitors() {
    this.listVisitors.forEach((visitor) => this.getInitialVisitor(visitor));
  }

  ngAfterViewInit() {
    this.modal.present();
  }

  closeModalVisitors() {
    this.modal.dismiss();
    this.isNewVisit 
      ? this._router.navigateByUrl('/guard-gate/tabs/visit/add-visit-qr')
      : this._router.navigateByUrl('/guard-gate/tabs/home');
    
  }

  controlValueChangeFilter(formControl: FormControl) {
    this.filterInput = formControl;
  }

  getInitialVisitor(visitor: IVisitor) {
    const getFirstLetter = (str: string): string => str.split(' ')[0].charAt(0);

    const letterName = getFirstLetter(visitor.names);
    const letterSurname = getFirstLetter(visitor.surnames);

    visitor.initials = letterName.concat(letterSurname);
  }

  getSelectedVisitors() {
    return this.listVisitors.filter((visitor) => visitor.isSelected);
  }

  getVisitors() {
    this.isLoadingVisitors = true;

    const queryParams: IGeneralRequestPagination = {
      limit: 1000
    }

    this._visitorService.getVisitors(queryParams).subscribe({
      next: (res) => {
        this.isLoadingVisitors = false;
        this.listVisitors = res.data.records;
        this.initializeVisitors();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingVisitors = false;
      },
    });
  }

  goToNewVisitor(){
    this._router.navigateByUrl('/guard-gate/visitors/add-visitor')
  }
}
