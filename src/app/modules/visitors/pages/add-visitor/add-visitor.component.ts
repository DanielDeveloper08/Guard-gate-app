import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { IAddVisitorRequest } from '../../interfaces/visitor.interface';
import { VisitorService } from '../../services/visitors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/services';
import { Position } from '../../../../shared/interfaces/toast.interface';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  isLoadingSave: boolean = false;
  visitor!: IAddVisitorRequest;
  private _router = inject(Router);
  private _toastService = inject(ToastService);
  private _visitorService = inject(VisitorService);


  constructor() { }

  ngOnInit() {
  }

  closeModalVisitors(){
    this._router.navigateByUrl('/guard-gate/visitors');
    this.modal.dismiss();
  }

  getValuesVisitor(visitor: IAddVisitorRequest){
    this.visitor = visitor;
  }

  saveVisitor(){
    this.isLoadingSave = true;
    this._visitorService.saveVisitors(this.visitor).subscribe({
      next: (res) => {
        this._toastService.showSuccess("Visitante registrado con éxito", Position.Top);
        this.isLoadingSave = false;
        this.closeModalVisitors();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingSave = false;
      },
    });
  }

}