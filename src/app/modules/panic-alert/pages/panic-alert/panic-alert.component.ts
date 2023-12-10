import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PanicAlertService } from '../../services/panic-alert.service';
import { IUser } from '../../../auth/interfaces/auth.interface';
import { Subscription } from 'rxjs';
import { IResidencesData } from '../../../profile/interfaces/residences';

@Component({
  selector: 'app-panic-alert',
  templateUrl: './panic-alert.component.html',
  styleUrls: ['./panic-alert.component.scss'],
})
export class PanicAlertComponent {
  counter: number = 0;
  @ViewChild('modal') modal!: IonModal;
  timer: any;
  private _panicAlertService = inject(PanicAlertService);


  async onButtonPress(): Promise<void> {
    this.timer = setInterval(() => {
      if (this.counter <= 4) {
        this.counter++;
      }
    }, 1000);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (this.counter == 5) {
      const user: IUser = JSON.parse(localStorage.getItem('user')!);

      this.modal.present();
      this._panicAlertService.sendAlertToGuard(user.id);
      clearInterval(this.timer);
      this.counter = 0;
    }
  }

  onButtonRelease(): void {
    clearInterval(this.timer);
    this.counter = 0;
  }
}
