import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EventsEnum } from '../interfaces/panic-alert.interface';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class PanicAlertService {
  private socket = io('http://localhost:8000');

  constructor() {}

  sendAlertToGuard(idResidente: number) {
    this.socket.emit(EventsEnum.NOTIFY_PANIC_ALERT, idResidente);
  }
  
  listenToAlerts(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(EventsEnum.NOTIFY_PANIC_ALERT, (data: any) => {
        observer.next(data);
      });
    });
  }
}
