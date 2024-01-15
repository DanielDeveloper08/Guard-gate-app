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
import { IVisit, IVisitDetail, IVisitorDetail } from '../../interfaces/visit.interface';
import { AlertController, IonModal } from '@ionic/angular';
import { ButtonStyle, VisitStatusEnum } from 'src/app/shared/interfaces/general.interface';
import { VisitService } from '../../services/visit.service';
import { ToastService } from 'src/app/shared/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Position } from 'src/app/shared/interfaces';

@Component({
  selector: 'detail-visit-modal',
  templateUrl: './detail-visit.component.html',
  styleUrls: ['./detail-visit.component.scss'],
})
export class DetailVisitComponent implements OnInit {
  isOpenDetail: boolean = false;
  @Input() visit!: IVisit | IVisitDetail | null;
  selectedVisit!: IVisitDetail;
  selectedVisitor!: IVisitorDetail | null;
  @ViewChild('modalDetailVisit') modalDetailVisit!: IonModal;
  @Output() reset: EventEmitter<boolean> = new EventEmitter<boolean>();
  pendingState: VisitStatusEnum = VisitStatusEnum.PENDING;

  private _alertController = inject(AlertController);
  private _visitService = inject(VisitService);
  private _toastService = inject(ToastService);
  buttonStyleEnum = ButtonStyle;
  statusVisit = VisitStatusEnum;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visit']?.currentValue != null) {
      this.selectedVisit = changes['visit']?.currentValue;
      this.modalDetailVisit.present();
    }
  }

  ngAfterViewInit() {
    this.modalDetailVisit.ionModalDidDismiss.subscribe(() => {
      this.reset.emit();
    });
  }

  async modalDidDismiss() {
    this.isOpenDetail = false;
  }

  closeDetail() {
    this.reset.emit();
    this.modalDetailVisit.dismiss();
  }

  openDetailVisitor(visitor: IVisitorDetail){
    this.selectedVisitor = visitor;
  }

  resetVisitorSelected(){
    this.selectedVisitor = null;
  }

  cancelVisit(idVisitCancel:number){
    // this.isLoadingVisit = true;
    this._visitService.cancelVisit(idVisitCancel).subscribe({
      next: (res) => {
        this._toastService.showSuccess('Visita cancelada con éxito', Position.Top);
        this.closeDetail();
        this.reset.emit(true);
      },
      error: (err: HttpErrorResponse) => {
        // this.isLoadingVisit = false;
      },
    });
  }

  async openAlert(cancelVisit: IVisitDetail) {
    const alert = await this._alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de cancelar la visita "${cancelVisit.reason}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
              this.cancelVisit(cancelVisit.id);
          },
        },
      ],
    });
    await alert.present();
  }


}
