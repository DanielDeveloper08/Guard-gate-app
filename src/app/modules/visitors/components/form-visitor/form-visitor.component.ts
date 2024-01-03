import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAddVisitorRequest } from '../../interfaces/visitor.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'form-visitor',
  templateUrl: './form-visitor.component.html',
  styleUrls: ['./form-visitor.component.scss'],
})
export class FormVisitorComponent implements OnInit {
  visitorForm!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  value!: FormControl;
  @Input() validForm:boolean=false;
  @Output() visitorFormEvent: EventEmitter<IAddVisitorRequest> = new EventEmitter<IAddVisitorRequest>();
  @Output() validVisitFormEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  protected onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.createForm();

    this.visitorForm.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe((change) => {
        this.validVisitFormEvent.emit(this.visitorForm.valid);
        this.visitorFormEvent.emit(change);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["validForm"]?.currentValue) {
      this.validVisitForm();
    }
  }

    /**
   * OnDestroy
   */
    ngOnDestroy(): void {
      this.onDestroy.next();
      this.onDestroy.complete();
    }


  validVisitForm() {
    if (this.visitorForm) {
      if (this.visitorForm.invalid) {
        this.visitorForm.markAllAsTouched();
      }
    }
  }

  /**
   * Crear formulario.
   */
  createForm() {
    this.visitorForm = this._formBuilder.group({
      names: ["" , [Validators.required]],
      surnames: ["" , [Validators.required]],
      docNumber: ["" , [Validators.required]],
      phone: ["", Validators.required]
    });
  }

  controlValueChangeNames(formControl: FormControl) {
    this.visitorForm.setControl('names', formControl);
  }

  controlValueChangeSurnames(formControl: FormControl) {
    this.visitorForm.setControl('surnames', formControl);
  }

  controlValueChangePhone(formControl: FormControl) {
    this.visitorForm.setControl('phone', formControl);
  }

  controlValueChangeDocnumber(formControl: FormControl) {
    this.visitorForm.setControl('docNumber', formControl);
  }
}
