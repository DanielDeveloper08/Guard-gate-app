import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QRCodeElementType } from 'angularx-qrcode';

@Component({
  selector: 'shared-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  @Input() qrData!: string;
  @ViewChild('parent') parentElement!: any;
  public elementType: QRCodeElementType = 'canvas' as QRCodeElementType;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getBase64();
  }

  getBase64() {
    let parentElement = null;
    console.log(this.parentElement);
    if (this.elementType === 'canvas') {
    }

    parentElement = this.parentElement.qrcElement.nativeElement;
    console.log('BASE 64', parentElement);
  }

  onChangeURL(url: SafeUrl) {
    let dataUrl: string = url.toString();
    console.log("url", url)
    this.blobToBase64(dataUrl).then(res => {
      console.log(res);
    });
  }

  blobToBase64(blob: any) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  }

  changeData() {
    this.qrData = '7';
  }
}
