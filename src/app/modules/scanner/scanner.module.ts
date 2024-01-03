import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner.component';
import { ScannerRoutingModule } from './scanner.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ScannerRoutingModule,
    SharedModule
  ],
  declarations: [ScannerComponent]
})
export class ScannerModule { }
