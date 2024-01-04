import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController } from '@ionic/angular';
import {
  IAddVisitorRequest,
  IAddVisitorResponse,
  IEditVisitorRequest,
  IVisitor,
} from '../../interfaces/visitor.interface';
import { VisitorService } from '../../services/visitors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/services';
import { Position } from '../../../../shared/interfaces/toast.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss'],
})
export class AddVisitorComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  title: string = 'Nuevo visitante';
  isLoadingSave: boolean = false;
  validForm: boolean = false;
  validVisitForm: boolean = false;
  visitor!: IAddVisitorRequest | IEditVisitorRequest;
  idVisitorEdit!: number;
  visitorEdit!: IAddVisitorResponse;

  private _router = inject(Router);
  private _toastService = inject(ToastService);
  private _visitorService = inject(VisitorService);
  private _activatedRoute = inject(ActivatedRoute);
  private _loadingController = inject(LoadingController);
  private _modalService = inject(ModalService);

  constructor() {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      const visitorId = params['idVisitor'];
      this.idVisitorEdit = visitorId;
    });

    if (this.idVisitorEdit) {
      this.title = 'Editar visitante';
      this.getVisitorById();
    }
  }

  async presentLoading() {
    const loading = await this._loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loading',
    });
    await loading.present();
    return loading;
  }

  closeModalVisitors() {
    this.modal.dismiss();
  }

  visitorFormEvent(visitor: IAddVisitorRequest | IEditVisitorRequest) {
    this.visitor = visitor;
  }

  saveVisitor() {
    if (!this.validForm) {
      this.validVisitForm = true;
      return;
    }

    this.isLoadingSave = true;
    this._visitorService
      .saveVisitors(this.visitor as IAddVisitorRequest)
      .subscribe({
        next: (res) => {
          this._toastService.showSuccess(
            'Visitante registrado con éxito',
            Position.Top
          );
          this.isLoadingSave = false;
          this._router.navigateByUrl('/guard-gate/visitors');
          this.closeModalVisitors();
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingSave = false;
        },
      });
  }

  editVisitor() {
    if (!this.validForm) {
      this.validVisitForm = true;
      return;
    }
    this.isLoadingSave = true;
    this._visitorService
      .editVisitor(this.visitor as IEditVisitorRequest, this.idVisitorEdit)
      .subscribe({
        next: (res) => {
          this._toastService.showSuccess(
            'Visitante actualizado con éxito',
            Position.Top
          );
          this.isLoadingSave = false;
          this._router.navigateByUrl('/guard-gate/visitors');
          this._modalService.emitCloseModalActionsVisitor();
          this.closeModalVisitors();
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingSave = false;
        },
      });
  }

  setValidForm(event: boolean) {
    this.validForm = event;
  }

  async getVisitorById() {
    const loading = await this.presentLoading();
    this._visitorService.getVisitorById(this.idVisitorEdit).subscribe({
      next: (res) => {
        this.visitorEdit = res.data;
        loading.dismiss();
      },
      error: (err: HttpErrorResponse) => {
        loading.dismiss();
      },
    });
  }
}
