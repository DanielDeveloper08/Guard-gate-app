import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IVisitor } from '../../interfaces/visitor.interface';

@Component({
  selector: 'selected-visitors',
  templateUrl: './selected-visitors.component.html',
  styleUrls: ['./selected-visitors.component.scss']
})
export class SelectedVisitorsComponent{
  @Input() listVisitor: IVisitor[]=[];
  @Output() changeVisitors: EventEmitter<void> = new EventEmitter<void>();

  removeVisitor(visitor: IVisitor){
    visitor.isSelected = false;
    this.changeVisitors.emit();
  }

}
