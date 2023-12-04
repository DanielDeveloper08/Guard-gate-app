import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-visit',
  templateUrl: './card-visit.component.html',
  styleUrls: ['./card-visit.component.scss']
})
export class CardVisitComponent implements OnInit {
  @Input() visit!: any;
  constructor() { }

  ngOnInit() {
  }

}
