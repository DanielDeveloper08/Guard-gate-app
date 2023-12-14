import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-visit-qr',
  templateUrl: './add-visit-qr.component.html',
  styleUrls: ['./add-visit-qr.component.scss']
})
export class AddVisitQrComponent implements OnInit {
  private _router = inject(Router);

  constructor() { }

  ngOnInit() {
  }

  showVisitors(){
    this._router.navigate(['/guard-gate/tabs/visit/add-visit-qr/visitors', { isVisit: true }]);
  }

}
