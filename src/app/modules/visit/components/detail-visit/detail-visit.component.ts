import { Component, Input, OnInit } from '@angular/core';
import { IVisit } from '../../interfaces/visit.interface';

@Component({
  selector: 'detail-visit',
  templateUrl: './detail-visit.component.html',
  styleUrls: ['./detail-visit.component.scss']
})
export class DetailVisitComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() selectedVisit!: IVisit;
  constructor() { }

  ngOnInit() {
  }

  async canDismiss(data?: any, role?: string) {
    this.isOpen = false;
    return role !== 'gesture';
  }

  async modalDidDismiss(event: any) {

    if (event && event.data && event.role === 'backdrop') {
      this.isOpen = false;
    }
  }

}
