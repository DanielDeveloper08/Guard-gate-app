import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerVisitComponent } from './pages/scanner-visit/scanner-visit.component';
import { ScannerRoutingModule } from './scanner.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { FormDetailVisitComponent } from './components/form-detail-visit/form-detail-visit.component';

@NgModule({
  imports: [
    CommonModule,
    ScannerRoutingModule,
    SharedModule
  ],
  declarations: [
    ScannerVisitComponent,
    UploadImagesComponent,
    FormDetailVisitComponent
  ]
})
export class ScannerModule { }
