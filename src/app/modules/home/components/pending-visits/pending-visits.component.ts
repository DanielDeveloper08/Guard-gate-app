import { Component, Input, OnInit } from '@angular/core';
import { IVisit } from 'src/app/modules/visit/interfaces/visit.interface';

@Component({
  selector: 'pending-visits',
  templateUrl: './pending-visits.component.html',
  styleUrls: ['./pending-visits.component.scss']
})
export class PendingVisitsComponent implements OnInit {
  @Input() visit!:IVisit;

  constructor() { }

  ngOnInit() {
  }

}
