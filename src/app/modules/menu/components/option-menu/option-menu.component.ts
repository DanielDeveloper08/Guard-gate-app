import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOptionMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.scss']
})
export class OptionMenuComponent implements OnInit {
  @Input() optionMenu!: IOptionMenu;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
