import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { VisitService } from '../../services/visit.service';

@Component({
  selector: 'list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.scss']
})
export class ListVisitComponent implements OnInit {
  filterInput: FormControl = new FormControl('', Validators.required);
  private _router = inject(Router);
  private _visitService = inject(VisitService);

  @ViewChild('modalTypeVisit') modalTypeVisit!: IonModal;

  visitData = [
    {
      name: 'John Doe',
      licensePlate: 'ABC123',
      id: '123456789',
      date: '01/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Mary Smith',
      licensePlate: 'XYZ789',
      id: '987654321',
      date: '02/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Carlos Rodriguez',
      licensePlate: 'DEF456',
      id: '456789012',
      date: '03/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Ana Martinez',
      licensePlate: 'GHI789',
      id: '345678901',
      date: '04/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Luisa Gonzalez',
      licensePlate: 'JKL012',
      id: '901234567',
      date: '05/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Pedro Sanchez',
      licensePlate: 'MNO345',
      id: '678901234',
      date: '06/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Isabel Ramirez',
      licensePlate: 'PQR678',
      id: '123450987',
      date: '07/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Ricardo Flores',
      licensePlate: 'STU901',
      id: '890123456',
      date: '08/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Elena Herrera',
      licensePlate: 'VWX234',
      id: '567890123',
      date: '09/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      name: 'Mario Jimenez',
      licensePlate: 'YZA567',
      id: '234567890',
      date: '10/12/2023',
      imageUrl: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
  ];
  
  constructor() { }

  ngOnInit() {
  }

  controlValueChangeFilter(formControl: FormControl) {
    if (this.filterInput !== formControl) {
      
    }
  }

  goToAddVisit(typeVisit:string){
    typeVisit == 'qr'
      ? this._router.navigateByUrl('/guard-gate/tabs/visit/add-visit-qr')
      : this._router.navigateByUrl('/guard-gate/tabs/visit/add-visit-preauthorized');

      this.modalTypeVisit.dismiss();
  } 

  showVisitors(visitType:string){
    this._visitService.setVisitType(visitType);
    this._router.navigateByUrl('/guard-gate/tabs/visit/visitors');
  }

  

}
