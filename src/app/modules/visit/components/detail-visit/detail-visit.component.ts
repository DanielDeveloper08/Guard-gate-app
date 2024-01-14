import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IVisit, IVisitDetail, IVisitorDetail } from '../../interfaces/visit.interface';
import { IonModal } from '@ionic/angular';
import { VisitStatusEnum } from 'src/app/shared/interfaces/general.interface';

@Component({
  selector: 'detail-visit-modal',
  templateUrl: './detail-visit.component.html',
  styleUrls: ['./detail-visit.component.scss'],
})
export class DetailVisitComponent implements OnInit {
  isOpenDetail: boolean = false;
  @Input() visit!: IVisit | IVisitDetail | null;
  selectedVisit!: IVisitDetail;
  selectedVisitor!: IVisitorDetail | null;
  @ViewChild('modalDetailVisit') modalDetailVisit!: IonModal;
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();
  pendingState: VisitStatusEnum = VisitStatusEnum.PENDING;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visit']?.currentValue != null) {
      this.selectedVisit = changes['visit']?.currentValue;
      this.modalDetailVisit.present();
    }
  }

  ngAfterViewInit() {
    this.modalDetailVisit.ionModalDidDismiss.subscribe(() => {
      this.reset.emit();
    });
  }

  async modalDidDismiss() {
    this.isOpenDetail = false;
  }

  closeDetail() {
    this.reset.emit();
    this.modalDetailVisit.dismiss();
  }

  openDetailVisitor(visitor: IVisitorDetail){
    this.selectedVisitor = visitor;
  }

  resetVisitorSelected(){
    this.selectedVisitor = null;
  }


}
