import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { VisitService } from '../../services/visit.service';
import { IGeneralRequestPagination } from '../../../../shared/interfaces/general.interface';
import { IVisit } from '../../interfaces/visit.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { DetailVisitComponent } from '../../components/detail-visit/detail-visit.component';

@Component({
  selector: 'list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.scss']
})
export class ListVisitComponent implements OnInit {
  filterInput: FormControl = new FormControl('', Validators.required);
  private _router = inject(Router);
  private _visitService = inject(VisitService);

  isLoadingVisit: boolean = false;
  listVisits: IVisit[]=[];
  selectedVisit!: IVisit;
  isOpenDetail: boolean = false;

  @ViewChild('modalTypeVisit') modalTypeVisit!: IonModal;
  @ViewChild('modalDetailVisit') modalDetailVisit!: IonModal;


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.getVisits();
  }

  ionViewWillEnter(){
    this.getVisits();
  }

  controlValueChangeFilter(formControl: FormControl) {
    if (this.filterInput !== formControl) {

    }
  }

  goToAddVisit(typeVisit:string){
    typeVisit == 'qr'
      ? this._router.navigateByUrl('/guard-gate/tabs/visit/add-visit-qr')
      : this._router.navigateByUrl('/guard-gate/tabs/visit/add-visit-preauthorized');

      this.modalTypeVisit.dismiss();
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








/*******DETAIL VISIT****************/

  openDetailVisit(visit: IVisit){
    this.selectedVisit = visit;
    this.isOpenDetail = true;
  }

  async modalDidDismiss() {
    this.isOpenDetail = false;
  }

  closeDetail(){
    this.isOpenDetail = false;
  }


}
