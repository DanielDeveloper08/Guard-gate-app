import { Component, OnInit, inject } from '@angular/core';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  photos: string[]=[];
  private _cameraService = inject(CameraService);
  isLoadingImage: boolean = false;
  constructor() { }

  ngOnInit() {
    this._cameraService.photos$.subscribe( data => {
      this.photos = data;
    });

    this._cameraService.isLoadingImage.subscribe(value => {
      console.log("IS LOADING", value)
      this.isLoadingImage = value;
    })
  }

  removePhoto(photoRemove:string){
    this._cameraService.removePhoto(photoRemove);
  }

}
