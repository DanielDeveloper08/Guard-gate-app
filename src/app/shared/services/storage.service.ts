import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { ToastService } from './toast.service';
import { Position } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage = inject(Storage);
  private _toastService = inject(ToastService);

  async uploadStorage(file: File, base: string, fileName: string) {
    const imgRef = ref(this._storage, `${base}/${fileName}`);

    try {
      const uploadTask = uploadBytes(imgRef, file);

      const snapshot = await uploadTask;

      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      this._toastService.showError('Error al subir el archivo', Position.Top);
      return undefined;
    }
  }
}
