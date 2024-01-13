import { Component, Input, OnInit } from '@angular/core';
import { ButtonStyle } from '../../interfaces/general.interface';

@Component({
  selector: 'shared-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label!: string;
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon!: string;
  @Input() style: ButtonStyle = ButtonStyle.Primary;

  constructor() { }

  ngOnInit() {
  }

  getButtonStyleClass(): string {
    return `${this.style}`;
  }
}
