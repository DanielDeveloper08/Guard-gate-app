import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CameraService } from '../../services/camera.service';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';

@Component({
  selector: 'form-detail-visit',
  templateUrl: './form-detail-visit.component.html',
  styleUrls: ['./form-detail-visit.component.scss']
})
export class FormDetailVisitComponent implements OnInit {
  @Input() idVisit!: number | undefined;
  @Input() visitor!: IVisitor | null;
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();


  private _formBuilder = inject(FormBuilder);
  private _scannerService = inject(CameraService);
  photos: string[]=[];
  visitorSelected!: IVisitor;


  @ViewChild('modal') modal!: IonModal;
  detailVisitForm!: FormGroup;

  ngAfterViewInit() {
    this.modal.ionModalDidDismiss.subscribe(() => {
      this.reset.emit();
    });
  }

  constructor() { }

  ngOnInit() {
    this.createForm();
    this.photos = this._scannerService.photos;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visitor']?.currentValue != null) {
      this.visitorSelected = changes['visitor']?.currentValue;
      this.modal.present();
    }
  }


  /**
   * Crear formulario.
   */
  createForm() {
    this.detailVisitForm = this._formBuilder.group({
      observation: ["" , [Validators.required]],
      photos: [[], [Validators.required]],
      carPlate: ["",[Validators.required]]
    });
  }


  controlValueChangeObservation(formControl: FormControl) {
    this.detailVisitForm.setControl('observation', formControl);
  }

  controlValueChangeCarPlate(formControl: FormControl) {
    this.detailVisitForm.setControl('carPlate', formControl);
  }

  closeModalVisitors(){
    this.modal.dismiss();
  }

  async takePhoto(){
    await this._scannerService.addNewPhoto();
   }

   saveDetail(){
    this.reset.emit();
   }

}
