import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaPrincipalPage } from './tela-principal';
import { MaskDirective } from './app.directive';

@NgModule({
  declarations: [
    TelaPrincipalPage,
    MaskDirective
  ],
  imports: [
    IonicPageModule.forChild(TelaPrincipalPage),
  ],
})
export class TelaPrincipalPageModule {}
