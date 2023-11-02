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

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  @Input() isPassword: boolean = false;
  @Input() formControlName: string = '';
  @Input() placeholder: string = '';
  @Input() maxlength: number = 20;
  @Input() pattern: string = '';
  @Input() minlength: number = 0;
  @Input() setFocus: boolean = false;
  @Input() type: 'text' | 'password' = 'text';

  @Output() visibilityChanged = new EventEmitter<boolean>();
  @ViewChild('inputTag', { static: false }) inputTag!: IonInput;

  showPasswordIcon: string = 'eye';
  ngOnChanges(changes: SimpleChanges) {
    if (changes['setFocus']) {
      changes['setFocus'].currentValue && this.inputTag.setFocus();
    }
  }

  togglePasswordVisibility() {
    this.showPasswordIcon = this.type === 'text' ? 'eye' : 'eye-off';
    this.type = this.type === 'text' ? 'password' : 'text';
  }
}
