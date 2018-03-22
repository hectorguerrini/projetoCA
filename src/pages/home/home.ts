import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }

  usuario="";
  senha="";
  retorno="";
  cadastro={
    registro:"15013103",
    senha:"0131"
  }

  login(){
    if(this.usuario==null || this.usuario==undefined){
      this.retorno = "R.A invalido";
    }else if(this.senha==null || this.senha==undefined){
      this.retorno = "Insira uma senha";
    }else if(this.usuario==this.cadastro.registro && this.senha==this.cadastro.senha){
      this.retorno = "Sucesso"
      this.navCtrl.push("TelaPrincipalPage")
    }else{
      this.retorno = "R.A ou Senha são invalidos"
    }
  }



}
