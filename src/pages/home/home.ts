import { Component } from '@angular/core';
import { PcaProvider } from '../../providers/pca/pca';
import { NavController } from 'ionic-angular';


import { Session } from '../../providers/session/session';
import { Usuario } from '../../app/models/usuario';
import { Data } from '../../app/models/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PcaProvider,Session]
})
export class HomePage {
  vendedor: Usuario;

  constructor(public navCtrl: NavController,public service: PcaProvider,public session: Session) {

  }
  criaSession() {
    this.session.create(this.vendedor);
  }

  usuario={registro:"",senha:""};

  retorno = "";
  ret = "";
  login(){
    this.service.getUsuario('lista',this.usuario.registro,this.usuario.senha)
    .subscribe((data:Data)=> {
      if(data.message){
        this.vendedor = data.jsonRetorno[0];
        this.criaSession();
        this.navCtrl.push("TelaPrincipalPage",this.vendedor)
      }
    })


    // if(this.usuario==null || this.usuario==undefined){
    //   this.retorno = "R.A invalido";
    // }else if(this.senha==null || this.senha==undefined){
    //   this.retorno = "Insira uma senha";
    // }else if(this.usuario==this.cadastro.registro && this.senha==this.cadastro.senha){
    //   this.retorno = "Sucesso"
    //   this.navCtrl.push("TelaPrincipalPage")
    // }else{
    //   this.retorno = "R.A ou Senha são invalidos"
    // }
  }



}
