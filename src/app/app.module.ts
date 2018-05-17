import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PcaProvider } from '../providers/pca/pca';
import { Session } from '../providers/session/session';


import { ComponentsModule } from "../components/components.module";
import { DirectivesModule } from "../directives/directives.module";
import { SettingsComponent } from '../components/settings/settings';
import { ConfigFestaComponent } from "../components/config-festa/config-festa";


@NgModule({
  declarations: [
    MyApp,
    HomePage

  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsComponent,
    ConfigFestaComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PcaProvider,
    Session
  ]
})
export class AppModule {}
