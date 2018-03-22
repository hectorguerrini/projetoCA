import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tela-principal',
  templateUrl: 'tela-principal.html',
})
export class TelaPrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TelaPrincipalPage');
  }
  comprador={
    tipo:null,
    registro:null,
    nome:null,
    sexo:null,
    valor:null,
    novo:null
  }
  lotes=[
    {label:'1º lote',valor:50},
    {label:'2º lote',valor:60},
    {label:'3º lote',valor:70}
  ]
  vendas={
    loteAtivo:0,
    sexo:false,
    alimento:false
  }
  base=[
    {nome:'HECTOR GUERRINI HERRERA',registro:'15.01310-3'},
    {nome:'MARCELO CUTRIM HIRATA',registro:'15.01486-0'},
    {nome:'PEDRO SAD CAIAFA',registro:'15.03383-0'}
  ]
  baseConvidado=[
    {nome:'HECTOR GUERRINI HERRERA',registro:'446.847.728-88'}
  ]
  data=[];
  buscar=true;
  set tipo(newObj){
    this.comprador={
      tipo:null,
      registro:null,
      nome:null,
      sexo:null,
      valor:null,
      novo:null
    }
    this.comprador.tipo = newObj;
    this.verificarValor();
  }



  verificarValor(){
    if(this.comprador.tipo=="0"){
      this.comprador.valor = 'R$ '+this.lotes[this.vendas.loteAtivo].valor.toFixed(2).replace('.',',');
    }else{
      this.comprador.valor = 'R$ '+(this.lotes[this.vendas.loteAtivo].valor+10).toFixed(2).replace('.',',');
    }
  }

  getInfos(){
    if(this.comprador.tipo=='0'){
      this.data = this.base.filter(b => b.registro === this.comprador.registro);
      this.comprador.nome = this.data.length>0?this.data[0].nome:null;
      this.buscar=this.data.length>0?false:true;
    }else{
      this.data = this.baseConvidado.filter(b => b.registro === this.comprador.registro);
      this.comprador.nome = this.data.length>0?this.data[0].nome:null;
      this.comprador.novo = this.comprador.nome?false:true;
      this.buscar=this.data.length>0?false:true;
    }


  }

  registroChange(){
    if(this.comprador.tipo=='0' && this.comprador.registro.length<10 && this.comprador.nome){
      this.comprador.nome=null;
      this.comprador.sexo=null;
      this.buscar=true;

    }else if(this.comprador.tipo=='1' && this.comprador.registro.length<14 && (this.comprador.nome || this.comprador.novo)){
      this.comprador.nome=null;
      this.comprador.sexo=null;
      this.comprador.novo=null;
      this.buscar=true;
    }
  }

}
