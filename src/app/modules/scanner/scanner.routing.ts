import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ScannerComponent } from "./scanner.component";

const routes: Routes = [
  {
    path: 'scanner',
    component:ScannerComponent 
  },
  { path: '**', redirectTo: 'scanner' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerRoutingModule {}
