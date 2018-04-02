import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { PcaProvider } from '../../providers/pca/pca';
import { Data } from '../../app/models/data';
/**
 * Generated class for the ConfigFestaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'config-festa',
  templateUrl: 'config-festa.html'
})
export class ConfigFestaComponent {
  festa_config={
    nome:null,
    lote_ativo:1,
    lotes:[
      {value:1,label:''},
      {value:2,label:''},
      {value:3,label:''},
    ],
    flag_alimento:false,
    flag_sexo:false
  }
  constructor(public viewCtrl: ViewController,public service: PcaProvider,) {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  salvarFesta(){
    this.service.updateFesta(
      'update_festa',
      this.festa_config.nome,
      this.festa_config.lote_ativo.toString(),
      this.festa_config.flag_alimento?"1":"0",
      this.festa_config.flag_sexo?"1":"0",
      this.festa_config.lotes
    ).subscribe((data:Data)=> {
      if(data.message){

        this.viewCtrl.dismiss();

      }
    })

  }



}
