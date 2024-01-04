import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVisitor } from '../../interfaces/visitor.interface';

@Component({
  selector: 'item-visitor',
  templateUrl: './item-visitor.component.html',
  styleUrls: ['./item-visitor.component.scss'],
})
export class ItemVisitorComponent implements OnInit {
  @Input() visitor!: IVisitor;
  @Input() isNewVisit: boolean=false;
  @Output() changeVisitors: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionsEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {}

  selectVisitor(visitor: IVisitor){
    if(!this.isNewVisit) return
    visitor.isSelected = !visitor.isSelected;
    this.changeVisitors.emit();
  }

  clickActions(){
    this.actionsEvent.emit();
  }
}
