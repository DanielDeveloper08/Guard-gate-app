import { EventEmitter, Injectable, inject } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  closeActionsVisitor: EventEmitter<void> = new EventEmitter<void>();
  private modalCtrl = inject(ModalController);

  emitCloseModalEvent() {
    this.closeModalEvent.emit();
  }

  emitCloseModalActionsVisitor() {
    this.closeActionsVisitor.emit();
  }

  public async dismissModal(data?: any): Promise<boolean> {
    return this.modalCtrl.dismiss(data);
  }

  public async showModal(opts: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    return modal;
  }
}
