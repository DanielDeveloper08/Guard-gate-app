import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'access-tag',
  templateUrl: './access-tag.component.html',
  styleUrls: ['./access-tag.component.scss']
})
export class AccessTagComponent implements OnInit {
  @Input() hasEntered: boolean | null = null;
  constructor() { }

  ngOnInit() {
  }

}
