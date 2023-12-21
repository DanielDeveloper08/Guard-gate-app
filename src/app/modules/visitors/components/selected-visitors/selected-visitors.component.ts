import { Component, Input, OnInit } from '@angular/core';
import { IVisitor } from '../../interfaces/visitor.interface';

@Component({
  selector: 'selected-visitors',
  templateUrl: './selected-visitors.component.html',
  styleUrls: ['./selected-visitors.component.scss']
})
export class SelectedVisitorsComponent implements OnInit {
  @Input() listVisitor: IVisitor[]=[];
  constructor() { }

  ngOnInit() {
  }

  
  removeVisitor(visitor: IVisitor){
    visitor.isSelected = false;
  }

}
