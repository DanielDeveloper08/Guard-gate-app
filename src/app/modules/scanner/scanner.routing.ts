import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ScannerVisitComponent } from "./pages/scanner-visit/scanner-visit.component";

const routes: Routes = [
  {
    path: 'scanner',
    component:ScannerVisitComponent
  },
  { path: '**', redirectTo: 'scanner' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerRoutingModule {}
