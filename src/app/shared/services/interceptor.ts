import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { LoginResponseI } from 'src/app/modules/auth/interfaces/auth.interface';
import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class GeneralInterceptor implements HttpInterceptor {
//   private countRequest = 0;
//   loginResponse!: LoginResponseI | null;

//   constructor(private router: Router) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (!this.countRequest) {
//       // this.sharedLibService.setIsloading(true);
//     }
//     this.countRequest++;

//     const token = this.loginService.getToken();
//     if (token && !req.url.includes('api.ipify.org')) {
//       if (!req.headers.has('service')) {
//         req = req.clone({
//           headers: req.headers.set('Authorization', `${token}`),
//         });
//       }
//     }
//     return next.handle(req).pipe(
//       finalize(() => {
//         this.countRequest--;
//         if (!this.countRequest) {
//           this.sharedLibService.setIsloading(false);
//         }
//       }),
//       map((event: HttpEvent<any>) => {
//         return event;
//       }),
//       catchError((err: HttpErrorResponse) => {
//         if (err.ok === false) {
//           if (!req.headers.has('service')) {
//             this.toastrService.error(
//               err.error.message
//                 ? err.error.message
//                 : 'Ha ocurrido un error inesperado...',
//               'Error'
//             );
//           }
//         }

//         // Token caducado
//         if (err.status === 401) {
//           if (!req.headers.has('service')) {
//             this.loginService.logout();
//             // TERMINAR CUALQUIER INSTANCIA
//           }
//         }
//         return throwError(() => err);
//       })
//     );
//   }
// }
