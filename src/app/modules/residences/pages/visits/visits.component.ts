import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { IVisitDetail } from 'src/app/modules/visit/interfaces/visit.interface';
import { VisitService } from 'src/app/modules/visit/services/visit.service';
import { IGeneralRequestPagination } from 'src/app/shared/interfaces/general.interface';

@Component({
  selector: 'visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  @ViewChild('modalVisit') modalVisit!: IonModal;
  isLoadingVisit: boolean = false;
  private _visitService = inject(VisitService);
  listVisits: IVisitDetail[]=[];
  filterInput: FormControl = new FormControl('');
  selectedVisit!: IVisitDetail | null;
  @Input() idResidency!:number | null;
  @Output()  reset: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  closeModal(){
    this.reset.emit();
    this.modalVisit.dismiss();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idResidency']?.currentValue != null) {
      this.modalVisit.present();
      this.getVisits(this.idResidency!);
    }
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      this.getVisits(this.idResidency!);
      event.target.complete();
    }, 2000);
  }

  openDetailVisit(visit: IVisitDetail){
    this.selectedVisit = visit;
  }

  getVisits(residencyId: number) {
    this.isLoadingVisit = true;

    const queryParams: IGeneralRequestPagination = {
      limit: 1000,
      residencyId: residencyId
    };

    this._visitService.getVisits(queryParams).subscribe({
      next: (res) => {
        this.isLoadingVisit = false;
        this.listVisits = res.data.records.reverse();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingVisit = false;
      },
    });
  }

  controlValueChangeFilter(formControl: FormControl) {
    this.filterInput = formControl;
  }

  resetVisitSelected(reload: boolean){
    this.selectedVisit = null;
    if(reload) this.getVisits(2);
  }



}
