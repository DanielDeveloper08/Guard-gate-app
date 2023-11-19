import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isOpenMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setIsOpenMenu(data: boolean) {
    this.isOpenMenu.next(data);
  }
}
