import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { VisitService } from '../../services/visit.service';
import { IGeneralRequestPagination } from '../../../../shared/interfaces/general.interface';
import { IVisit } from '../../interfaces/visit.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.scss']
})
export class ListVisitComponent implements OnInit {
  filterInput: FormControl = new FormControl('', Validators.required);
  private _router = inject(Router);
  private _visitService = inject(VisitService);
  private _modalService = inject(ModalService);

  isLoadingVisit: boolean = false;
  listVisits: IVisit[]=[];
  selectedVisit!: IVisit | null;



  @ViewChild('modalTypeVisit') modalTypeVisit!: IonModal;


  constructor() { }

  ngOnInit() {
    this.getVisits();

    this._modalService.closeModalEvent.subscribe(()=> {
      this.modalTypeVisit.dismiss();
    })
  }

  ionViewWillEnter(){
    this.getVisits();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getVisits();
      event.target.complete();
    }, 2000);
  }

  controlValueChangeFilter(formControl: FormControl) {
    this.filterInput = formControl;
  }

  showVisitors(visitType:string){
    this._visitService.setVisitType(visitType);
    this._router.navigateByUrl('/guard-gate/tabs/visit/visitors');
  }

  getVisits() {
    this.isLoadingVisit = true;

    const queryParams: IGeneralRequestPagination = {
      limit: 1000,
    };

    this._visitService.getVisits(queryParams).subscribe({
      next: (res) => {
        this.isLoadingVisit = false;
        this.listVisits = res.data.records;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingVisit = false;
      },
    });
  }

  openDetailVisit(visit: IVisit){
    this.selectedVisit = visit;
  }

  resetVisitSelected(){
    this.selectedVisit = null;
  }
}
