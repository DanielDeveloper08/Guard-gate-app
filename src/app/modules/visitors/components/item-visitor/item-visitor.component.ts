import { Component, Input, OnInit } from '@angular/core';
import { IVisitor } from '../../interfaces/visitor.interface';

@Component({
  selector: 'item-visitor',
  templateUrl: './item-visitor.component.html',
  styleUrls: ['./item-visitor.component.scss'],
})
export class ItemVisitorComponent implements OnInit {
  @Input() visitor!: IVisitor;
  @Input() isNewVisit: boolean=false;
  constructor() {}

  ngOnInit() {
  }

  selectVisitor(visitor: IVisitor){
    visitor.isSelected = !visitor.isSelected;
  }
}
