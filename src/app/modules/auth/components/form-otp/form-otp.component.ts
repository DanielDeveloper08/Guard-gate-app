import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICodeData } from '../../interfaces/auth.interface';

@Component({
  selector: 'form-otp',
  templateUrl: './form-otp.component.html',
  styleUrls: ['./form-otp.component.scss']
})
export class FormOtpComponent implements OnInit {
  codeOtp: string = "";
  isDisabled: boolean = true;
  @Input() isLoading:boolean = false;
  @Output() validateOtpEvent: EventEmitter<ICodeData> = new EventEmitter<ICodeData>();
  constructor() { }

  ngOnInit() {
  }


  getCodeOtp(event: string){
    this.codeOtp = event;
    this.updateDisabledBtnState();
  }

  validateOtp(){
    if (this.isCodeOtpValid()) {
      this.validateOtpEvent.emit({code: this.codeOtp, eventClick: true});
    }
  }

  private updateDisabledBtnState() {
    this.isDisabled = this.codeOtp.length !== 6;
  }

  private isCodeOtpValid(): boolean {
    return this.codeOtp.length === 6;
  }
}

