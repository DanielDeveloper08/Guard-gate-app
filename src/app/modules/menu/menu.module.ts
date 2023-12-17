import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptionMenuComponent } from './components/option-menu/option-menu.component';

@NgModule({
  imports: [
    CommonModule,
    // MenuRoutingModule,
    SharedModule,
  ],
  declarations: [MenuComponent,OptionMenuComponent],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
