import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
