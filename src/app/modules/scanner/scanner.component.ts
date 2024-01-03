import { Component, OnInit, inject } from '@angular/core';
import { CameraService } from './services/camera.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  private _scannerService = inject(CameraService);
  photos: string[]=[];
  constructor() { }

  ngOnInit() {
    this.photos = this._scannerService.photos;
  }

  async takePhoto(){
   await this._scannerService.addNewPhoto();
  }

}
