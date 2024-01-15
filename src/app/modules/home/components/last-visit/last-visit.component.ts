import { Component, Input, OnInit } from '@angular/core';
import { IVisitDetail } from 'src/app/modules/visit/interfaces/visit.interface';
import { ILastVisitsTransformed } from '../../interfaces/home.interface';

@Component({
  selector: 'last-visit',
  templateUrl: './last-visit.component.html',
  styleUrls: ['./last-visit.component.scss']
})
export class LastVisitComponent implements OnInit {
  @Input() visit!:ILastVisitsTransformed;

  constructor() { }

  ngOnInit() {
  }


}
