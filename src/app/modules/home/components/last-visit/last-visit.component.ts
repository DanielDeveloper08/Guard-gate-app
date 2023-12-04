import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'last-visit',
  templateUrl: './last-visit.component.html',
  styleUrls: ['./last-visit.component.scss']
})
export class LastVisitComponent implements OnInit {
  @Input() visit!:any;
  constructor() { }

  ngOnInit() {
  }

}
