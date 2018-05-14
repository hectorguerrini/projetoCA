import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ConfigFestaComponent } from "../../components/config-festa/config-festa";
import { PcaProvider } from "../../providers/pca/pca";
import { Data } from "../../app/models/data";
import { File } from "@ionic-native/file";
import * as fileSaver from 'file-saver';

/**
 * Generated class for the FestasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-festas',
  templateUrl: 'festas.html',
})
export class FestasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public service: PcaProvider,public file:File) {
    this.getListaFestas();

  }

  flag_nova_festa=false;
  lista_festas=[]
  editFesta() {
    let modal = this.modalCtrl.create(ConfigFestaComponent);
    modal.present();
  }
  getListaFestas(){
    this.service.getListaFestas('get_lista_festas')
    .subscribe((data:Data) => {
      if(data.message){
        this.lista_festas = data.jsonRetorno;

      }

    })
  }

  geraExcel(festa){

    var html = "<?xml version='1.0' encoding='UTF-8'?>";
    var blob = new Blob([html],{type: "text/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"})

    console.log(html)

    fileSaver.saveAs(blob,'Teste.xlsx')
    // this.file.writeFile(this.file.dataDirectory,'teste.xls', blob).then((res:any)=>{

    //   console.log("DONE WRITING");
    //   console.log(res);


    // },(error)=>{
    //   console.error("Error while saving image");
    //   console.log(error);
    // });
  }

}
