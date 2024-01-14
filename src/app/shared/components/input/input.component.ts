import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonInput } from '@ionic/angular';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  @Input() isPassword: boolean = false;
  @Input() placeholder: string = '';
  @Input() maxlength: number = 20;
  @Input() pattern!: string;
  @Input() minlength: number = 0;
  @Input() setFocus: boolean = false;
  @Input() type: 'text' | 'password' = 'text';
  @Input() value: string="";
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() labelPosition: string = '';
  @Input() validators: ValidatorFn[] = [];
  @Output() visibilityChanged = new EventEmitter<boolean>();
  @ViewChild('inputTag', { static: false }) inputTag!: IonInput;
  @Output() controlValueChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  showPasswordIcon: string = 'eye';

  formControl: FormControl = new FormControl('');

  ngOnInit(){
    this.formControl.setValidators(this.validators);
    this.formControl.valueChanges.subscribe( change => {
      this.controlValueChange.emit(this.formControl);
      this.validatePattern(change);
    })
  }


  validatePattern(value: string){
    if(this.pattern){
      const patternRegExp = new RegExp(this.pattern);
      if (!patternRegExp.test(value)) {
        this.formControl.setValue(value.slice(0, -1), { emitEvent: false });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['setFocus']) {
      changes['setFocus'].currentValue && this.inputTag.setFocus();
    }
    if (changes['value']) {
      this.value && this.formControl.setValue(this.value);

      this.disabled && this.formControl.disable();

    }

  }

  togglePasswordVisibility() {
    this.showPasswordIcon = this.type === 'text' ? 'eye' : 'eye-off';
    this.type = this.type === 'text' ? 'password' : 'text';
  }
}
