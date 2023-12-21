import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() backUrl!:string;
  @Output() backClick: EventEmitter<void> = new EventEmitter<void>();
  private _router = inject(Router);

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.backClick.emit();
   this._router.navigateByUrl(this.backUrl);   
  }

}
