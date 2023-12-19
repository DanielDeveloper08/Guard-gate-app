import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() backUrl!:string;
  private _router = inject(Router);

  constructor() { }

  ngOnInit() {
  }

  back(){
   this._router.navigateByUrl(this.backUrl);
  }

}
