import { Component, inject } from '@angular/core';
import { MenuService } from '../menu/services/menu.service';

@Component({
  selector: 'app-tab-initial',
  templateUrl: './tab-initial.component.html',
  styleUrls: ['./tab-initial.component.scss']
})
export class TabInitialComponent {

  private _menuService = inject(MenuService);

  openModalMenu(){
    const stateModal = this._menuService.isOpenMenu;
    console.log("state", stateModal.value)
    this._menuService.setIsOpenMenu(!stateModal.value);
  }

}
