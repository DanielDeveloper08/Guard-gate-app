import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabInitialComponent } from './tab-initial.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabInitialRoutingModule } from './tab-initial.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabInitialRoutingModule
  ],
  declarations: [TabInitialComponent]
})
export class TabInitialModule { }
