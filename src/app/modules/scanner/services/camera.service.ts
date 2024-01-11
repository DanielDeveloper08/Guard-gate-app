import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private _photos: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  photos$ = this._photos.asObservable(); // Hacer pública la referencia como un Observable

  constructor() {}

  async addNewPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });


    if (photo.base64String && photo.format) {
      const base64Image = `data:image/${photo.format.toLowerCase()};base64,${photo.base64String}`;
      const currentPhotos = this._photos.value.slice();
      currentPhotos.unshift(base64Image);
      this._photos.next(currentPhotos);
    }
  }

  removePhoto(photoRemove: string) {
    const currentPhotos = this._photos.value.slice();
    const index = currentPhotos.indexOf(photoRemove);

    if (index !== -1) {
      currentPhotos.splice(index, 1);
      this._photos.next(currentPhotos);
    }
  }

  resetPhotos(){
    this._photos.next([]);
  }
}
