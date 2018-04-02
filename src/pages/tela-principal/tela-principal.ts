import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { PcaProvider } from '../../providers/pca/pca';

import { Storage } from "@ionic/storage";
import { Session } from './../../providers/session/session';
import { Usuario } from '../../app/models/usuario';
import { Data } from '../../app/models/data';
import { SettingsComponent } from '../../components/settings/settings';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html',
  providers: [PcaProvider,Session]
})
export class TelaPrincipalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: PcaProvider,
    public session: Session,
    public storage: Storage,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController

  ) {
    this.vendedor = navParams.data;
    this.getFesta();
    this.getComboFesta();
  }
  vendedor:Usuario;
  ngOnInit(){
    this.session.get()
    .then(res => {
        this.vendedor = new Usuario(res);

    });

  }

  openSettings(ev){
    let popover = this.popoverCtrl.create(SettingsComponent);
    popover.present({ev:ev});

  }
  festa_config={
    nome:"",
    lote_ativo:1,
    flag_alimento:false,
    flag_sexo:false
  }
  comprador={
    id:null,
    tipo:null,
    registro:null,
    nome:null,
    sexo:null,
    valor:null,
    novo:null,
    alimento:null
  }
  festa_config_lotes=[]


  baseConvidado=[
    {nome:'HECTOR GUERRINI HERRERA',registro:'446.847.728-88'}
  ]
  data=[];
  buscar=true;
  set tipo(newObj){
    this.comprador={
      id:null,
      tipo:null,
      registro:null,
      nome:null,
      sexo:null,
      valor:null,
      novo:null,
      alimento:null
    }
    this.comprador.tipo = newObj;
    this.buscar=true;
    //this.verificarValor();
  }



  // verificarValor(){
  //   if(this.comprador.tipo=="0"){
  //     this.comprador.valor = 'R$ '+this.festa_config_lotes[this.festa_config.id_lote-1].value.toFixed(2).replace('.',',');
  //   }else{
  //     this.comprador.valor = 'R$ '+(this.festa_config_lotes[this.festa_config.id_lote-1].value+15).toFixed(2).replace('.',',');
  //   }
  // }

  getInfos(){
    if(this.comprador.tipo=="0"){
      this.service.getAluno('detalhes',this.comprador.registro)
    .subscribe((data:Data)=> {
      if(data.message){
        this.comprador.nome = data.jsonRetorno[0].nome;
        this.comprador.id = data.jsonRetorno[0].id_aluno;
        this.buscar=false;
      }
    })
    }else{
      this.buscar=false;
      this.comprador.novo=true;
    }

    // if(this.comprador.tipo=='0'){
    //   this.data = this.base.filter(b => b.registro === this.comprador.registro);
    //   this.comprador.nome = this.data.length>0?this.data[0].nome:null;
    //   this.buscar=this.data.length>0?false:true;
    // }else{
    //   this.data = this.baseConvidado.filter(b => b.registro === this.comprador.registro);
    //   this.comprador.nome = this.data.length>0?this.data[0].nome:null;
    //   this.comprador.novo = this.comprador.nome?false:true;
    //   this.buscar=this.data.length>0?false:true;
    // }
  }
  updateVenda(){
      this.comprador.valor = (this.festa_config_lotes[this.festa_config.lote_ativo-1].label - (this.comprador.alimento ? 5 : 0) )
        this.service.updateVenda(
          'update_venda',
          this.comprador.id,
          this.vendedor.id_aluno,
          this.comprador.valor.toString(),
          this.comprador.alimento?"1":"0",
          this.comprador.sexo
        )
        .subscribe((data:Data) =>{
          if(data.message){
            this.zerarForm('save');

          }else{

            var alert = this.alertCtrl.create({
              title: 'Erro ao finalizar venda',
              subTitle: 'Venda já registrada em '+data.jsonRetorno[0].data_venda+' .',
              buttons: ['OK']
            });
            alert.present();

          }
        })
  }

  zerarForm(evento){
    this.comprador.id = null;
    this.comprador.nome = null;
    this.comprador.sexo = null;
    this.comprador.novo = null;
    this.comprador.registro = evento == 'save' ?null : this.comprador.registro;
    this.buscar = true;

  }
  registroChange(){
    if(this.comprador.tipo=='0' && this.comprador.registro.length<10 && this.comprador.nome){
      this.zerarForm('change');

    }else if(this.comprador.tipo=='1' && this.comprador.registro.length<14 && (this.comprador.nome || this.comprador.novo)){
      this.zerarForm('change');
    }
  }

  getComboFesta(){
    this.service.getComboLote('get_lotes',"1")
    .subscribe((data:Data) => {
        if(data.message){
          this.festa_config_lotes = data.jsonRetorno;

        }
    })

  }

  getFesta(){
    this.service.getFesta('get_festa',"1")
    .subscribe((data:Data) => {
        if(data.message){
          this.festa_config = data.jsonRetorno[0];

        }
    })

  }

}
