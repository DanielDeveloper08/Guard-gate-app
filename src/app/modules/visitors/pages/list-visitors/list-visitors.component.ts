import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonModal } from '@ionic/angular';
import { IVisitor } from '../../interfaces/visitor.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-visitors',
  templateUrl: './list-visitors.component.html',
  styleUrls: ['./list-visitors.component.scss'],
})
export class ListVisitorsComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  filterInput: FormControl = new FormControl('', Validators.required);
  isNewVisit: boolean = false;

  listVisitors: IVisitor[] = [
    {
      id: 3,
      names: 'Robert Michael',
      surnames: 'Johnson Garcia',
      docNumber: '0912345678',
      idResidency: 23,
      isSelected: false,
      initials: ""
    },
    {
      id: 4,
      names: 'Emma Grace',
      surnames: 'Williams Lopez',
      docNumber: '0923456789',
      idResidency: 36,
      isSelected: false,
      initials: ""
    },
    {
      id: 5,
      names: 'William Thomas',
      surnames: 'Davis Martinez',
      docNumber: '0934567890',
      idResidency: 58,
      isSelected: false,
      initials: ""
    },
    {
      id: 6,
      names: 'Olivia Rose',
      surnames: 'Smith Hernandez',
      docNumber: '0945678901',
      idResidency: 19,
      isSelected: false,
      initials: ""
    },
    {
      id: 7,
      names: 'Alexander James',
      surnames: 'Miller Rodriguez',
      docNumber: '0956789012',
      idResidency: 42,
      isSelected: false,
      initials: ""
    },
    {
      id: 8,
      names: 'Sophia Grace',
      surnames: 'Johnson Perez',
      docNumber: '0967890123',
      idResidency: 17,
      isSelected: false,
      initials: ""
    },
    {
      id: 9,
      names: 'Ethan Daniel',
      surnames: 'Jones Gomez',
      docNumber: '0978901234',
      idResidency: 36,
      isSelected: false,
      initials: ""
    },
    {
      id: 10,
      names: 'Ava Elizabeth',
      surnames: 'Taylor Smith',
      docNumber: '0989012345',
      idResidency: 58,
      isSelected: false,
      initials: ""
    },
  ];
  
  constructor() {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.isNewVisit = params.get('isVisit') == 'true' ? true : false;
    });

    this.listVisitors.map( visitor =>this.getInitialVisitor(visitor));
  }

  ngAfterViewInit() {
    this.modal.present();
  }

  closeModalVisitors() {
    this.modal.dismiss();
    this._router.navigateByUrl('/guard-gate/tabs/visit/add-visit-qr');
  }

  controlValueChangeFilter(formControl: FormControl) {
    this.filterInput = formControl;
  }

  getInitialVisitor(visitor: IVisitor) {
    const getFirstLetter = (str: string): string => str.split(' ')[0].charAt(0);
  
    const letterName = getFirstLetter(visitor.names);
    const letterSurname = getFirstLetter(visitor.surnames);
  
    visitor.initials = letterName.concat(letterSurname);
  }

  getSelectedVisitors(){
    return this.listVisitors.filter( visitor => visitor.isSelected);
  }
}
