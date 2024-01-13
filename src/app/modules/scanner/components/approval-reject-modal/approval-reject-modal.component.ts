import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { IonModal, AlertController } from '@ionic/angular';
import { IVisitorDetail } from 'src/app/modules/visit/interfaces/visit.interface';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';
import { ButtonStyle } from 'src/app/shared/interfaces/general.interface';

@Component({
  selector: 'approval-reject-modal',
  templateUrl: './approval-reject-modal.component.html',
  styleUrls: ['./approval-reject-modal.component.scss']
})
export class ApprovalRejectModalComponent implements OnInit {
  @Input() isOpenModal: boolean = false;
  @Input() visitor!: IVisitorDetail | null;
  buttonStyleEnum = ButtonStyle;
  @Output() reset: EventEmitter<void> = new EventEmitter<void>;
  @Output() hasEnteredEvent: EventEmitter<boolean> = new EventEmitter<boolean>;

  allowEntry: boolean = false;

  @ViewChild('modalActions') modalActions!: IonModal;

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.modalActions.ionModalDidDismiss.subscribe(() => {
      this.reset.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpenModal']?.currentValue) {
      this.modalActions.present();
    }
  }

  closeActions() {
    this.reset.emit();
    this.modalActions.dismiss();
  }

  async openAlert(isAllowing: boolean) {
    this.allowEntry = isAllowing;
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: this.getAlertMessage(),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.allowEntry = false;
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.allowEntry = true;
            this.hasEnteredEvent.emit(isAllowing);
            this.closeActions();
          },
        },
      ],
    });
    await alert.present();
  }

  getAlertMessage(): string {
    if (this.allowEntry) {
      return `¿Estás seguro de permitir el ingreso al visitante ${this.visitor?.names} ${this.visitor?.surnames}?`;
    } else {
      return `¿Estás seguro de rechazar el ingreso al visitante ${this.visitor?.names} ${this.visitor?.surnames}?`;
    }
  }
}
