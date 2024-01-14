import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IVisit, IVisitorDetail } from '../../interfaces/visit.interface';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'detail-visit-by-visitor',
  templateUrl: './detail-visit-by-visitor.component.html',
  styleUrls: ['./detail-visit-by-visitor.component.scss']
})
export class DetailVisitByVisitorComponent implements OnInit {
  @Input() visitor!: IVisitorDetail | null;
  selectedVisitor!: IVisitorDetail;
  @ViewChild('modalDetailVisit') modalDetailVisit!: IonModal;
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();


  photos: string[]= [];

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visitor']?.currentValue != null) {
      this.selectedVisitor = changes['visitor']?.currentValue;
      if(this.selectedVisitor){
        this.photos = JSON.parse(this.selectedVisitor?.photos!);
      }

      this.modalDetailVisit.present();
    }
  }

  ngAfterViewInit() {
    this.modalDetailVisit.ionModalDidDismiss.subscribe(() => {
      this.reset.emit();
    });
  }


  closeDetail() {
    this.reset.emit();
    this.modalDetailVisit.dismiss();
  }

}
