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
    flag_alimento:false,
    flag_sexo:false,
    flag_camarote:false
  }
  lotesNormal=[
    {value:1,label:'',tipo:'aluno'},
    {value:2,label:'',tipo:'aluno'},
    {value:3,label:'',tipo:'aluno'},
    {value:1,label:'',tipo:'naluno'},
    {value:2,label:'',tipo:'naluno'},
    {value:3,label:'',tipo:'naluno'}
  ]
  lotesEspecial=[
    {value:1,label:'',tipo:'aluno'},
    {value:2,label:'',tipo:'aluno'},
    {value:3,label:'',tipo:'aluno'},
    {value:1,label:'',tipo:'naluno'},
    {value:2,label:'',tipo:'naluno'},
    {value:3,label:'',tipo:'naluno'}
  ]
  constructor(public viewCtrl: ViewController,public service: PcaProvider) {

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
      this.lotesNormal,
      this.festa_config.flag_camarote?this.lotesEspecial:null,
      this.festa_config.flag_camarote?"1":"0"
    ).subscribe((data:Data)=> {
      if(data.message){

        this.viewCtrl.dismiss();

      }
    })

  }



}
