import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  Router,
} from '@angular/router';
import { IonModal } from '@ionic/angular';
import { IVisitor } from '../../interfaces/visitor.interface';
import { FormControl, Validators } from '@angular/forms';
import { VisitorService } from '../../services/visitors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IGeneralRequestPagination } from '../../../../shared/interfaces/general.interface';
import { VisitService } from '../../../visit/services/visit.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-list-visitors',
  templateUrl: './list-visitors.component.html',
  styleUrls: ['./list-visitors.component.scss'],
})
export class ListVisitorsComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  private _router = inject(Router);
  private _visitorService = inject(VisitorService);
  private _visitService = inject(VisitService);
  private _modalService = inject(ModalService);

  filterInput: FormControl = new FormControl('', Validators.required);
  isNewVisit: boolean = false;
  isLoadingVisitors: boolean = false;
  listVisitors: IVisitor[] = [];
  listVisitorsSelected: IVisitor[] = [];

  ngOnInit() {
    this.getVisitors();
    this.handleRouteParams();

    this._visitorService.listSelectedVisitors.subscribe( change => {
      this.listVisitorsSelected = change;
    })

    //Se cierra modal cuando se termina el flujo de visita
    this._modalService.closeModalEvent.subscribe(()=>{
      this.closeModal();
    })
  }

  private handleRouteParams() {
    const visitType = this._visitService.visitState.visitType;
    if (visitType === 'qr' || visitType === 'preautorizado') {
      this.isNewVisit = true;
    }
  }

  private initializeVisitors() {
    this.listVisitors.forEach((visitor) => this.getInitialVisitor(visitor));
  }

  ngAfterViewInit() {
    this.modal.present();
  }

  getBackRoute() {
    return this.isNewVisit
      ? '/guard-gate/tabs/visit/list-visit'
      : '/guard-gate/tabs/home';
  }

  closeModal() {
    this._visitorService.updateListSelectedVisitors([]);
    this._visitService.clearVisitState();
    this.modal.dismiss();
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

  changeVisitor() {
    const filterVisitorsSelected = this.listVisitors.filter(
      (visitor) => visitor.isSelected
    );
    this._visitorService.updateListSelectedVisitors(filterVisitorsSelected);
  }

  getVisitors() {
    this.isLoadingVisitors = true;

    const queryParams: IGeneralRequestPagination = {
      limit: 1000,
    };

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

  goToNewVisitor() {
    this._router.navigateByUrl('/guard-gate/visitors/add-visitor');
  }

}
