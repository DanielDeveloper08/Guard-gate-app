import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'form-otp',
  templateUrl: './form-otp.component.html',
  styleUrls: ['./form-otp.component.scss']
})
export class FormOtpComponent implements OnInit {
  codeOtp: string = "";
  isDisabled: boolean = true;
  @Output() validateOtpEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit() {
  }


  getCodeOtp(event: string){
    this.codeOtp = event;
    this.updateDisabledBtnState();
  }

  validateOtp(){
    if (this.isCodeOtpValid()) {
      this.validateOtpEvent.emit(true);
    }
  }

  private updateDisabledBtnState() {
    this.isDisabled = this.codeOtp.length !== 6;
  }

  private isCodeOtpValid(): boolean {
    return this.codeOtp.length === 6;
  }
}

