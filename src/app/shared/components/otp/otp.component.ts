import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  @Output() code = new EventEmitter<string>();
  @Input() quantity!: number;

  onOtpChange(otp: string) {
    this.code.emit(otp);
  }
}
