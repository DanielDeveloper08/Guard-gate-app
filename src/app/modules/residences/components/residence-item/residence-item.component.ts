import { Component, Input, OnInit } from '@angular/core';
import { IPerson, IResidenceItem } from '../../interfaces/residences.interface';

@Component({
  selector: 'residence-item',
  templateUrl: './residence-item.component.html',
  styleUrls: ['./residence-item.component.scss']
})
export class ResidenceItemComponent implements OnInit {
  @Input() residence!: IResidenceItem;
  constructor() { }

  ngOnInit() {
  }

}
