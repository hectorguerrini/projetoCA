import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

 /* Generated class for the PcaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PcaProvider {

  private urlApi = '../vendas/'

  constructor(public http: HttpClient) {

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

  getAluno(chave:string, registro:string,id_festa:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('registro',registro);
    body.set('id_festa',id_festa);
   return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  getConvidado(chave:string, cpf:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('cpf',cpf)

   return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  updateVenda(chave:string, id_aluno:string,id_vendedor:string,valor:string,flag_alimento:string,sexo:string,lote:string,id_festa:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('id_aluno',id_aluno)
    body.set('id_vendedor',id_vendedor)
    body.set('valor',valor)
    body.set('flag_alimento',flag_alimento)
    body.set('sexo',sexo)
    body.set('lote',lote)
    body.set('id_festa',id_festa)
    return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  updateVendaConvidado(chave:string, cpf:string,id_vendedor:string,valor:string,flag_alimento:string,sexo:string,nome:string,lote:string,id_festa:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('cpf',cpf)
    body.set('id_vendedor',id_vendedor)
    body.set('valor',valor)
    body.set('flag_alimento',flag_alimento)
    body.set('sexo',sexo)
    body.set('nome',nome)
    body.set('lote',lote)
    body.set('id_festa',id_festa)
   return this.http.post(
      url,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  updateFesta(chave:string, nome:string, flag_alimento:string, flag_sexo:string,lotesNormal:any[],lotesEspecial:any[],flag_camarote:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('nome',nome)
    body.set('flag_sexo',flag_sexo)
    body.set('flag_alimento',flag_alimento)
    body.set('flag_camarote',flag_camarote)
    body.set('lotesNormal',JSON.stringify(lotesNormal))
    body.set('lotesEspecial',JSON.stringify(lotesEspecial))
    return this.http.post(url,body.toString(),{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
  }

  getListaFestas(chave:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    return this.http.post(url,body.toString(),{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
  }
  getFesta(chave:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    //body.set('id_festa',id_festa)
    return this.http.post(url,body.toString(),{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
  }
  getComboLote(chave:string,id_festa:string){
    var url = this.urlApi+chave;
    var body = new URLSearchParams();
    body.set('id_festa',id_festa)
    return this.http.post(url,body.toString(),{headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
  }
}
