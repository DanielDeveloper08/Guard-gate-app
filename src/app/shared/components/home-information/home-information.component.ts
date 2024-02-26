import { Component, Input, OnInit, inject } from '@angular/core';
import { IMainHome } from '../../../modules/home/interfaces/home.interface';
import { UrbanizationService } from '../../services/urbanization.service';
import { IUrbanization } from '../../interfaces/urbanization';

@Component({
  selector: 'home-information',
  templateUrl: './home-information.component.html',
  styleUrls: ['./home-information.component.scss'],
})
export class HomeInformationComponent implements OnInit {
  @Input() home!: IMainHome;

  ngOnInit() {}
}
