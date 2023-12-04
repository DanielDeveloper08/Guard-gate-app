import { Component, inject } from '@angular/core';
import { MenuService } from './services/menu.service';
import { IOptionMenu } from './interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private _menuService = inject(MenuService);
  presentingElement:Element | null = null;
  isMenuOpen!: boolean;

  optionsMenu: IOptionMenu[]= [
    {
      iconName: "people-outline",
      avatarColor: "var(--mandy-900)",
      label: "Empleados"
    },
    {
      iconName: "qr-code-outline",
      avatarColor: "var(--royal-blue-950)",
      label: "Generar QR"
    },
    {
      iconName: "document-text-outline",
      avatarColor: "var(--royal-blue-800)",
      label: "Reportes"
    }
  ];

  ngOnInit() {
    this.presentingElement = document.querySelector('.menu-container');

    this._menuService.isOpenMenu.subscribe( value => {
      this.isMenuOpen = value;
    })
  }

  closeMenu(){
    this._menuService.setIsOpenMenu(false);
  }

}
