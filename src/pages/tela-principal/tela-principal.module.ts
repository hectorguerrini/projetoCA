import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaPrincipalPage } from './tela-principal';
import { telaMaskDirective } from './tela.directive';

@NgModule({
  declarations: [
    TelaPrincipalPage,
    telaMaskDirective

  ],
  imports: [
    IonicPageModule.forChild(TelaPrincipalPage)

  ],
})
export class TelaPrincipalPageModule {}
