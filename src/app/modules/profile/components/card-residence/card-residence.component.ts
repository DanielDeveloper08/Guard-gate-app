import { Component, Input, OnInit } from '@angular/core';
import { IResidence } from '../../interfaces/residences';

@Component({
  selector: 'card-residence',
  templateUrl: './card-residence.component.html',
  styleUrls: ['./card-residence.component.scss']
})
export class CardResidenceComponent implements OnInit {

  @Input() residence!:IResidence;

  constructor() { }

  ngOnInit() {
  }
}
