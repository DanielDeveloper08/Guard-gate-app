import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ParamsAlertI, Position } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) {}

  public async showAlert(paramsAlert: ParamsAlertI) {
    
    const alert = await this.alertController.create({
      header: paramsAlert.header ?? 'Alerta',
      subHeader: paramsAlert.subHeader ?? '',
      message: paramsAlert.message ?? '',
      buttons: paramsAlert.buttons ?? [],
    });

    await alert.present();
  }
}
