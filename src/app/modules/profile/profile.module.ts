import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
