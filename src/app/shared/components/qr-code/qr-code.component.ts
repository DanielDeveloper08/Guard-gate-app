import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QRCodeElementType } from 'angularx-qrcode';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  @Input() qrData!: string;
  @ViewChild('parent') parentElement!: any;
  public elementType: QRCodeElementType = 'canvas' as QRCodeElementType;

  constructor() {}

  ngOnInit() {}

}
