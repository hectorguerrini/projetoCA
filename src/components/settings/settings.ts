import { Component } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { Session } from '../../providers/session/session';
/**
 * Generated class for the SettingsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsComponent {

  constructor(
    public viewCtrl: ViewController,
    public appCtrl: App,
    public session: Session
  ) { }

  logout(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().pop();
    this.session.remove();
  }
  abrirFestas(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push("FestasPage")
  }
}
