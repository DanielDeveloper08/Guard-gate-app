import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonInput } from '@ionic/angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  @Input() setFocus: boolean = false;
  @Input() value: string="";
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() options: {optionValue:string, optionName:string}[] = [];
  @Input() labelPosition: string = '';
  @Output() visibilityChanged = new EventEmitter<boolean>();
  @ViewChild('selectTag', { static: false }) inputTag!: IonInput;
  @Output() controlValueChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  formControl: FormControl = new FormControl('');

  ngOnInit(){
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
}
