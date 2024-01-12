import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IUser } from '../../auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private _storageService = inject(StorageService);
  private _photos: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  photos$ = this._photos.asObservable();
  isLoadingImage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  async addNewPhoto() {
    try {

      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      this.setIsLoadingImage(true);

      if (photo.webPath && photo.format) {

        const blob = await fetch(photo.webPath).then((r) => r.blob());

        const fileName = 'photos.png';
        const lastModified = new Date().getTime();
        const fileType = blob.type;

        const file = new File([blob], fileName, {
          lastModified,
          type: fileType,
        });
        const user: IUser = JSON.parse(localStorage.getItem('user')!);
        const downloadURL = await this._storageService.uploadStorage(
          file,
          'photos',
          `${user.phone}/${photo.webPath.split('/')[3]}`
        );

        if (downloadURL) {
          const currentPhotos = this._photos.value.slice();
          currentPhotos.unshift(downloadURL);
          this._photos.next(currentPhotos);
          this.setIsLoadingImage(false);
        }
      }
    } catch (error) {
      console.error(error);
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

  resetPhotos() {
    this._photos.next([]);
  }

  setIsLoadingImage(loading: boolean){
    this.isLoadingImage.next(loading);
  }
}
