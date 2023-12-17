import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAddVisitorRequest } from '../../interfaces/visitor.interface';

@Component({
  selector: 'form-visitor',
  templateUrl: './form-visitor.component.html',
  styleUrls: ['./form-visitor.component.scss'],
})
export class FormVisitorComponent implements OnInit {
  visitorForm!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  value!: FormControl;
  @Output() visitorFormEvent: EventEmitter<IAddVisitorRequest> = new EventEmitter<IAddVisitorRequest>();

  constructor() {}

  ngOnInit() {
    this.createForm();

    this.visitorForm.valueChanges.subscribe((change) => {
      this.visitorFormEvent.emit(change);
    });
  }

  /**
   * Crear formulario.
   */
  createForm() {
    this.visitorForm = this._formBuilder.group({
      names: ["" , [Validators.required]],
      surnames: ["" , [Validators.required]],
      docNumber: ["" , [Validators.required]]
    });
  }

  controlValueChangeNames(formControl: FormControl) {
    this.visitorForm.setControl('names', formControl);
  }

  controlValueChangeSurnames(formControl: FormControl) {
    this.visitorForm.setControl('surnames', formControl);
  }

  controlValueChangeDocnumber(formControl: FormControl) {
    this.visitorForm.setControl('docNumber', formControl);
  }
}
