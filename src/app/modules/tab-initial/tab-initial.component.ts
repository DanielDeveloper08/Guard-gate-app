import { Component, ViewChild, inject } from '@angular/core';
import { MenuService } from '../menu/services/menu.service';
import { IUser } from '../auth/interfaces/auth.interface';
import { IonModal } from '@ionic/angular';
import { PanicAlertService } from '../panic-alert/services/panic-alert.service';
import { IResidencesData } from '../profile/interfaces/residences';

@Component({
  selector: 'app-tab-initial',
  templateUrl: './tab-initial.component.html',
  styleUrls: ['./tab-initial.component.scss']
})
export class TabInitialComponent {

  private _menuService = inject(MenuService);
  private _panicAlertService = inject(PanicAlertService);
  dataEmergency!: IResidencesData;
  userRole!:string;
  @ViewChild('modal') modal!: IonModal;
  timer: any;


  ngOnInit(){
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    this.userRole = user.role;
  }

  ionViewWillEnter() {
    this._panicAlertService.listenToAlerts().subscribe((res:IResidencesData) => {
      this.dataEmergency = res;
      this.modal.present();
    });
  }

  openModalMenu(){
    const stateModal = this._menuService.isOpenMenu;
    console.log("state", stateModal.value)
    this._menuService.setIsOpenMenu(!stateModal.value);
  }

}
