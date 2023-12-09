import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { IResidence } from 'src/app/modules/profile/interfaces/residences';
import { ResidenceService } from 'src/app/modules/profile/services/residence.service';
import { IMainHome } from '../../interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _residenceService = inject(ResidenceService);
  mainResidence!: IMainHome;
  ngOnInit() {
    this.getResidences();
  }

  ionViewDidEnter(){
    this.getResidences();
  }

  visitData:any = [
    {
      visitor: 'John Doe',
      date: '01/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Mary Smith',
      date: '02/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Carlos Rodriguez',
      date: '03/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Emily Johnson',
      date: '04/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Michael Wilson',
      date: '05/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Emma Brown',
      date: '06/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'David White',
      date: '07/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Sophia Davis',
      date: '08/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Liam Martinez',
      date: '09/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
    {
      visitor: 'Olivia Taylor',
      date: '10/12/2023',
      image: 'https://img.freepik.com/foto-gratis/mujer-sentada-su-auto-nuevo_1303-31672.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais',
    },
  ];

  getResidences(){
    // this.isLoadingResidences = true;
    this._residenceService.getResidencesByUser().subscribe({
      next: (res) => {
        // this.isLoadingResidences = false;
        const home: IMainHome = {
          id: res.data.id,
          names: res.data.names,
          surnames: res.data.surnames,
          residence: res.data.residences.find(residence => residence.isMain)! ?? null,
        }
        this.mainResidence = home;
      },
      error: (err:HttpErrorResponse) => {
        // this.isLoadingResidences = false;
      }
    });
  }

}
