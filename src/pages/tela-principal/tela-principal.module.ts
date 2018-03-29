import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaPrincipalPage } from './tela-principal';

import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from "../../directives/directives.module";
import { SettingsComponent } from '../../components/settings/settings';
@NgModule({
  declarations: [
    TelaPrincipalPage
  ],
  imports: [
    IonicPageModule.forChild(TelaPrincipalPage),
    DirectivesModule,
    ComponentsModule
  ],
  entryComponents:[SettingsComponent]
})
export class TelaPrincipalPageModule {}
