import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';


/*
  Generated class for the PcaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PcaProvider {
  private urlApi = 'http://127.0.0.1:3000/'

  constructor(public http: HttpClient) {
    console.log('Hello PcaProvider Provider');
  }


  getUsuario(chave:string,usuario:string,senha:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('usuario',usuario)
    body.set('senha',senha)

    return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  getAluno(chave:string, registro:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('registro',registro)

   return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  updateVenda(chave:string, id_aluno:string,id_vendedor:string,valor:string,flag_alimento:string,sexo:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('id_aluno',id_aluno)
    body.set('id_vendedor',id_vendedor)
    body.set('valor',valor)
    body.set('flag_alimento',flag_alimento)
    body.set('sexo',sexo)
   return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

}
