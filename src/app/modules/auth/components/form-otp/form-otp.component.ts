import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'form-otp',
  templateUrl: './form-otp.component.html',
  styleUrls: ['./form-otp.component.scss']
})
export class FormOtpComponent implements OnInit {

  @Output() validateOtpEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit() {
  }


  getCodeOtp(event: string){
    console.log(event);
  }

  validateOtp(){
    this.validateOtpEvent.emit(true);
  }
}
