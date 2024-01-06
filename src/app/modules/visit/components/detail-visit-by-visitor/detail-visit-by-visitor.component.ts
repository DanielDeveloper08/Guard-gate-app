import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IVisit } from '../../interfaces/visit.interface';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'detail-visit-by-visitor',
  templateUrl: './detail-visit-by-visitor.component.html',
  styleUrls: ['./detail-visit-by-visitor.component.scss']
})
export class DetailVisitByVisitorComponent implements OnInit {
  @Input() visit!: IVisit | null;
  selectedVisit!: IVisit;
  @ViewChild('modalDetailVisit') modalDetailVisit!: IonModal;
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();


  photos: string[]= [
    "assets/visita.jpg",
    "assets/visita.jpg",
    "assets/visita.jpg"
  ];

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


  closeDetail() {
    this.reset.emit();
    this.modalDetailVisit.dismiss();
  }

}
