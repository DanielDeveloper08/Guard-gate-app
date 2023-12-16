import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() initials!: string;
  @Input() showCloseIcon = false;
  @Output() removeVisitor: EventEmitter<void> = new EventEmitter<void>();

  handleAvatarClick(event: Event) {
    event.stopPropagation();
  }

  remove(event: Event) {
    this.removeVisitor.emit();
    event.stopPropagation();
  }
}
