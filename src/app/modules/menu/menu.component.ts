import { Component, inject } from '@angular/core';
import { MenuService } from './services/menu.service';
import { IOptionMenu } from './interfaces/menu.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private _menuService = inject(MenuService);
  presentingElement:Element | null = null;
  isMenuOpen!: boolean;
  private _router = inject(Router);


  optionsMenu: IOptionMenu[]= [
    {
      iconName: "people-outline",
      avatarColor: "var(--mandy-900)",
      label: "Visitantes",
      route: "/guard-gate/visitors"
    },
    {
      iconName: "thumbs-down-outline",
      avatarColor: "var(--royal-blue-950)",
      label: "Lista negra",
      route: "/guard-gate/tabs/visit/add-visit-qr/visitors"
    },
  ];

  ngOnInit() {
    this.presentingElement = document.querySelector('.menu-container');

    this._menuService.isOpenMenu.subscribe( value => {
      this.isMenuOpen = value;
      console.log("menu", this.isMenuOpen);
    })
  }

  closeMenu(){
    this._menuService.setIsOpenMenu(false);
  }

  goToOption(route : string){
    this._router.navigateByUrl(route);
  }

}
