import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private countRequest = 0;

  private _loginService = inject(LoginService);

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.countRequest) {
      // this.sharedLibService.setIsloading(true);
    }
    this.countRequest++;

    // const token = this.loginService.getToken();
    const token = localStorage.getItem("token");

    if (token) {
      if (!req.headers.has('service')) {
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.countRequest--;
        if (!this.countRequest) {
          // this.sharedLibService.setIsloading(false);
        }
      }),
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.ok === false) {
          if (!req.headers.has('service')) {
            // this.toastrService.error(
            //   err.error.message
            //     ? err.error.message
            //     : 'Ha ocurrido un error inesperado...',
            //   'Error'
            // );
          }
        }

        // Token caducado
        if (err.status === 401) {
          if (!req.headers.has('service')) {

            this._loginService.logout();
            // TERMINAR CUALQUIER INSTANCIA
          }
        }
        return throwError(() => err);
      })
    );
  }
}
