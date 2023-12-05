import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-panic-alert',
  templateUrl: './panic-alert.component.html',
  styleUrls: ['./panic-alert.component.scss'],
})
export class PanicAlertComponent {
  counter: number = 0;
  @ViewChild('modal') modal!: IonModal;
  timer: any;

  async onButtonPress(): Promise<void> {
    this.timer = setInterval(() => {
      if (this.counter <= 4) {
        this.counter++;
      }
    }, 1000);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (this.counter == 5) {
      this.modal.present();
      clearInterval(this.timer);
      this.counter = 0;
    }
  }

  onButtonRelease(): void {
    clearInterval(this.timer);
    this.counter = 0;
  }
}
