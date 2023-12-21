import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() selectedDateTime: EventEmitter<string> = new EventEmitter<string>();
  selectedValue: string = "";

  constructor() { }

  ngOnInit() {
    const now = new Date();
    this.selectedValue = now.toISOString();
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
