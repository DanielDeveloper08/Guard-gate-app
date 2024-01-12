import { Component, OnInit, inject } from '@angular/core';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  photos: string[]=[];
  private _scannerService = inject(CameraService);

  constructor() { }

  ngOnInit() {
    this._scannerService.photos$.subscribe( data => {
      this.photos = data;
    });
  }

  removePhoto(photoRemove:string){
    this._scannerService.removePhoto(photoRemove);
  }

}
