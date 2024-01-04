import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { IVisitor } from '../../interfaces/visitor.interface';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { VisitorService } from '../../services/visitors.service';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'actions-modal-visitor',
  templateUrl: './actions-modal.component.html',
  styleUrls: ['./actions-modal.component.scss'],
})
export class ActionsModalComponent implements OnInit {
  @Input() visitor!: IVisitor;
  @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>;
  @ViewChild('modalActions') modalActions!: IonModal;

  private _router = inject(Router);
  private _visitorService = inject(VisitorService);
  private _modalService = inject(ModalService);
  private _toastService = inject(ToastService);

  ngOnInit() {
    this._modalService.closeActionsVisitor.subscribe(() => {
      this.modalActions.dismiss();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visitor'].currentValue) {
      this.modalActions.present();
    }
  }

  closeActions() {
    this.modalActions.dismiss();
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'Eliminar',
      role: 'confirm',

      handler: () => {
        this.deleteVisitor();
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  goToEditVisitor() {
    this._router.navigateByUrl(
      `/guard-gate/visitors/edit-visitor/${this.visitor.id}`
    );
  }

  deleteVisitor() {
    this._visitorService.deleteVisitor(this.visitor.id).subscribe({
      next: (res) => {
        this._toastService.showSuccess(
          'Visitante eliminado con éxito',
          Position.Top
        );
        this.closeActions();
        this.deleteEvent.emit();
      },
      error: (err: HttpErrorResponse) => {
        // this.isLoadingSave = false;
      },
    });
  }
}
