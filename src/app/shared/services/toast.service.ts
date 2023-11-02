import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Position } from '../interfaces';
import { AnimationBuilder } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showSuccess(
    message = 'Proceso exitoso',
    position: Position = Position.Bottom
  ) {
    await this.showToast(message, position, 'success', 'checkmark-circle');
  }

  async showInfo(message: string, position: Position = Position.Bottom) {
    await this.showToast(message, position, 'primary', 'information-circle');
  }

  async showWarning(message: string, position: Position = Position.Bottom) {
    await this.showToast(message, position, 'warning', 'alert');
  }

  async showError(message: string, position: Position = Position.Bottom) {
    await this.showToast(message, position, 'danger', 'close-circle');
  }

  private async showToast(
    message: string,
    position: Position = Position.Bottom,
    color: string = 'primary',
    icon: string = 'information-circle' // Icono por defecto
  ) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      color: color,
      icon: icon,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          icon: 'close',
        },
      ],
      animated: true,
      cssClass: [
        'animate__animated',
        'animate__bounce',
        'animate__fadeInDownBig',
      ],
      keyboardClose: true,
    });

    toast.buttons = [
      {
        side: 'end',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          toast.dismiss();
        },
      },
    ];

    await toast.present();

    setTimeout(async () => {
      const toastElement = await toast;
      toastElement.classList.add('animate__fadeOutUpBig');

      toast.onDidDismiss().then(() => {
        toastElement.remove();
      });
    }, 5000);
  }
}
