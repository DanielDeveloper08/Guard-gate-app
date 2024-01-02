import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  emitCloseModalEvent() {
    this.closeModalEvent.emit();
  }
}
