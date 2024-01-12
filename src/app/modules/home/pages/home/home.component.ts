import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ResidenceService } from 'src/app/modules/profile/services/residence.service';
import { IMainHome } from '../../interfaces/home.interface';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { HomeService } from '../../services/home.service';
import { IVisit } from 'src/app/modules/visit/interfaces/visit.interface';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { IVisitor } from 'src/app/modules/visitors/interfaces/visitor.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _residenceService = inject(ResidenceService);
  private _homeService = inject(HomeService);
  private _toastService = inject(ToastService);

  visitors:IVisitor[]=[
    {
        "id": 11,
        "names": "Daniel Steven",
        "surnames": "Asanza Erazo",
        "docNumber": "0943995555",
        "idResidency": 1,
        "initials": "DF"
    },
    {
        "id": 13,
        "names": "José",
        "surnames": "Dominguez",
        "docNumber": "0993837373",
        "idResidency": 1,
        "initials": "DF"
    },
    {
        "id": 14,
        "names": "Paulina",
        "surnames": "Rodríguez",
        "docNumber": "0940532492",
        "idResidency": 1,
        "initials": "DF"
    },
    {
        "id": 15,
        "names": "Bryan",
        "surnames": "Martínez",
        "docNumber": "0938374747",
        "idResidency": 1,
        "initials": "DF"
    }
]
  mainResidence!: IMainHome;
  userRole!:string;
  pendingVisits: IVisit[]=[];
  isLoadingSummary: boolean = false;
  isLoadingResidences: boolean = false;
  ngOnInit() {
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    this.userRole = user.role;
  }

  ionViewWillEnter(){
    this.getResidences();
    this.getSummaryData();
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
    this.isLoadingResidences = true;
    this._residenceService.getResidencesByUser().subscribe({
      next: (res) => {
        this.isLoadingResidences = false;
        const home: IMainHome = {
          id: res.data.id,
          names: res.data.names,
          surnames: res.data.surnames,
          residence: res.data.residences.find(residence => residence.isMain)! ?? null,
        }
        this.mainResidence = home;
        localStorage.setItem('mainResidence', JSON.stringify(home.residence));
      },
      error: (err:HttpErrorResponse) => {
        this._toastService.showError("Ocurrió un error al cargar la residencia", Position.Top);
        this.isLoadingResidences = false;
      }
    });
  }

  getSummaryData(){
    this.isLoadingSummary = true;
    this._homeService.getSummary().subscribe({
      next: (res) => {
        this.isLoadingSummary = false;
        this.pendingVisits = res.data.lastVisits;
      },
      error: (err:HttpErrorResponse) => {
        this.isLoadingSummary = false;
        this._toastService.showError("Ocurrió un error al cargar el resumen", Position.Top);
      }
    });
  }

}
