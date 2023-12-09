import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile.routing';
import { CardOptionComponent } from './components/card-option/card-option.component';
import { MainResidenceComponent } from './pages/main-residence/main-residence.component';
import { CardResidenceComponent } from './components/card-residence/card-residence.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    CardOptionComponent,
    MainResidenceComponent,
    CardResidenceComponent
  ]
})
export class ProfileModule { }
