import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVisitor } from '../../interfaces/visitor.interface';
import { ToastService } from 'src/app/shared/services';

@Component({
  selector: 'selected-visitors',
  templateUrl: './selected-visitors.component.html',
  styleUrls: ['./selected-visitors.component.scss']
})
export class SelectedVisitorsComponent{
  @Input() listVisitor: IVisitor[]=[];
  @Output() changeVisitors: EventEmitter<void> = new EventEmitter<void>();

  constructor( private _toastService: ToastService) { }

  removeVisitor(visitor: IVisitor){
      visitor.isSelected = false;
      this.changeVisitors.emit();
  }
}
