import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() selectedDateTime: EventEmitter<string> = new EventEmitter<string>();
  selectedValue: string = '';
  minDate!: string;
  datesBeforeToday: string[] = [];

  ngOnInit() {
    const now = new Date();

    const nowInEcuador = new Date();
    const year = nowInEcuador.getFullYear();
    const month = String(nowInEcuador.getMonth() + 1).padStart(2, '0');
    const day = String(nowInEcuador.getDate()).padStart(2, '0');

    const isoDateString = `${year}-${month}-${day}`;
    this.minDate = isoDateString;


    nowInEcuador.setUTCHours(nowInEcuador.getUTCHours() - 5);
    this.selectedValue = nowInEcuador.toISOString();
  }

  handleDateTimeChange(event: Event): void {
    this.selectedValue = (event.target as any).value;
  }

  confirm(): void {
    this.selectedDateTime.emit(this.selectedValue);
  }

  handleBackdropTap(): void {
    this.selectedDateTime.emit();
  }
}
