import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVisit, IVisitDetail, IVisitorDetail } from '../../interfaces/visit.interface';
import { IVisitor } from '../../../visitors/interfaces/visitor.interface';

@Component({
  selector: 'card-visit',
  templateUrl: './card-visit.component.html',
  styleUrls: ['./card-visit.component.scss']
})
export class CardVisitComponent implements OnInit {
  @Input() visit!: IVisitDetail;
  visitors: string = "";
  @Output() emitOpenDetail: EventEmitter<IVisitDetail> = new EventEmitter<IVisitDetail>();
  constructor() { }

  ngOnInit() {
    this.getNamesOfVisitors();
  }

  getNamesOfVisitors() {
    if (this.visit && this.visit.visitors && this.visit.visitors.length > 0) {
      const namesArray: string[] = this.visit.visitors.map((visitor: IVisitorDetail) => {
        const firstName = visitor.names.split(' ')[0];
        const lastName = visitor.surnames.split(' ')[0];
        return `${firstName} ${lastName}`;
      });

      this.visitors = namesArray.join(', ');
    }
  }

  openModal(visit: IVisitDetail){
    this.emitOpenDetail.emit(visit);
  }

}
