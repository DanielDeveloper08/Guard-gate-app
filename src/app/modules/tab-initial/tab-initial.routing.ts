import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabInitialComponent } from './tab-initial.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MenuGuard } from '../auth/guards/menu.guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuard, MenuGuard],
    canLoad:  [AuthGuard,MenuGuard],
    component: TabInitialComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'visit',
        loadChildren: () => import('../visit/visit.module').then(m => m.VisitModule)
      },
      // {
      //   path: 'menu',
      //   loadChildren: () => import('../menu/menu.module').then(m => m.MenuModule)
      // },
      {
        path: 'panic-alert',
        loadChildren: () => import('../panic-alert/panic-alert.module').then(m => m.PanicAlertModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('../scanner/scanner.module').then(m => m.ScannerModule) 
      }
    ]
  },
  {
    path: 'visitors',
    loadChildren: () => import('../visitors/visitors.module').then(m => m.VisitorsModule)
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path:"**",
    redirectTo:'tabs/home' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabInitialRoutingModule {}
