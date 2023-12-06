import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-option',
  templateUrl: './card-option.component.html',
  styleUrls: ['./card-option.component.scss']
})
export class CardOptionComponent implements OnInit {
  @Input() label!:string;
  @Input() iconName!: string;
  @Input() redText!: boolean;
  constructor() { }

  ngOnInit() {
  }

}
