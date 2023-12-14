import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() initials!: string;
  constructor() { }

  ngOnInit() {
  }

}
