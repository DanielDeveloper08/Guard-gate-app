import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  photos: string[] = [];

  constructor() {}

  async addNewPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    if (photo.base64String && photo.format) {
      const base64Image = `data:image/${photo.format.toLowerCase()};base64,${photo.base64String}`;
      this.photos.unshift(base64Image);
      console.log(this.photos);
    }
  }
}
