import { Component, OnInit, inject } from '@angular/core';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  photos: string[]=[];
  private _scannerService = inject(CameraService);

  constructor() { }

  ngOnInit() {
    this.photos = this._scannerService.photos;
  }

  async takePhoto(){
    await this._scannerService.addNewPhoto();
   }

}
