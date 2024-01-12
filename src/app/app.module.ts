import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/services/interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    SharedModule,
    SocketIoModule.forRoot(config),
    NoopAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage())
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
