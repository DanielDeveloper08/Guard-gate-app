import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  private _router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const user: IUser = localStorage.getItem('user')!;

    // if (user.role === 'RESIDENTE') {
    //   const currentUrl: string = state.url;
    //   console.log('Ruta actual:', currentUrl);

    //   this._router.navigateByUrl('/login');
    //   return false;
    // }

    return true;
  }
}
