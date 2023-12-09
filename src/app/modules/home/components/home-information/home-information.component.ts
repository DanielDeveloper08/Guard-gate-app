import { Component, Input, OnInit } from '@angular/core';
import { IMainHome } from '../../interfaces/home.interface';

@Component({
  selector: 'home-information',
  templateUrl: './home-information.component.html',
  styleUrls: ['./home-information.component.scss']
})
export class HomeInformationComponent implements OnInit {
  @Input() home!: IMainHome;

  ngOnInit() {
  }

}
