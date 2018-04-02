import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FestasPage } from './festas';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  declarations: [
    FestasPage,
  ],
  imports: [
    IonicPageModule.forChild(FestasPage),
    DirectivesModule
  ],
})
export class FestasPageModule {}
