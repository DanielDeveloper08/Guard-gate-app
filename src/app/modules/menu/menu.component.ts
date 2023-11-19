import { Component, inject } from '@angular/core';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private _menuService = inject(MenuService);
  presentingElement:Element | null = null;
  isMenuOpen!: boolean;

  ngOnInit() {
    this.presentingElement = document.querySelector('.menu-container');

    this._menuService.isOpenMenu.subscribe( value => {
      this.isMenuOpen = value;
      console.log("change", this.isMenuOpen)
    })
  }

  closeMenu(){
    this._menuService.setIsOpenMenu(false);
  }

}
