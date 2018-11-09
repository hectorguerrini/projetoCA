import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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
  providers: [PcaProvider, Session]
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

  }

  vendas = 'vendas';
  vendedor: Usuario;
  listDel: Array<any>;
  ngOnInit() {
    this.session.get()
      .then(res => {
        this.vendedor = new Usuario(res);

      });

  }

  openSettings(ev) {
    let popover = this.popoverCtrl.create(SettingsComponent);
    popover.present({ ev: ev });

  }
  festa_config = {
    nome: "",
    lote_ativo: 1,
    flag_alimento: false,
    flag_sexo: false,
    id_festa: null,
    flag_camarote: false
  }
  comprador = {
    id: null,
    tipo: null,
    ingresso: null,
    registro: null,
    nome: null,
    sexo: null,
    valor: null,
    novo: null,
    alimento: null,
    periodo: null
  }
  lotes_pista_aluno = []
  lotes_pista_naluno = []
  lotes_camarote_aluno = []
  lotes_camarote_naluno = []


  baseConvidado = [
    { nome: 'HECTOR GUERRINI HERRERA', registro: '446.847.728-88' }
  ]
  data = [];
  buscar = true;
  setTipo(newObj) {
    this.comprador = {
      id: null,
      tipo: null,
      ingresso: null,
      registro: null,
      nome: null,
      sexo: null,
      valor: null,
      novo: null,
      alimento: null,
      periodo: null
    }
    this.comprador.tipo = newObj;
    this.buscar = true;
    //this.verificarValor();
  }



  // verificarValor(){
  //   if(this.comprador.tipo=="0"){
  //     this.comprador.valor = 'R$ '+this.festa_config_lotes[this.festa_config.id_lote-1].value.toFixed(2).replace('.',',');
  //   }else{
  //     this.comprador.valor = 'R$ '+(this.festa_config_lotes[this.festa_config.id_lote-1].value+15).toFixed(2).replace('.',',');
  //   }
  // }

  getInfos() {
    if (this.comprador.tipo == "0") {
      this.service.getAluno('detalhes', this.comprador.registro, this.festa_config.id_festa)
        .subscribe((data: Data) => {
          if (data.message) {
            this.comprador.nome = data.jsonRetorno[0].nome;
            this.comprador.id = data.jsonRetorno[0].id_aluno;
            this.comprador.periodo = data.jsonRetorno[0].periodo;
            this.buscar = false;
          } else if (data.jsonRetorno.length > 0) {
            if(this.vendas == 'delete'){
              this.listDel = data.jsonRetorno;
            } else {
              var alert = this.alertCtrl.create({
                title: 'Erro ao buscar aluno',
                subTitle: 'Venda já registrada em ' + data.jsonRetorno[0].data_venda + '.',
                buttons: ['OK']
              });
              alert.present();
            }

          } else {
            var alertError = this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Aluno não encontrado',
              buttons: ['OK']
            });
            alertError.present();
          }
        })
    } else if (this.comprador.tipo == "1") {
      if (this.TestaCPF(this.comprador.registro)) {
        this.buscar = false;
        if (this.vendas == 'delete') {
          this.service.getConvidado('detalhes_convidado', this.comprador.registro, this.festa_config.id_festa)
            .subscribe((data: Data) => {
              if (data.jsonRetorno.length > 0) {
                this.listDel = data.jsonRetorno;
              } else {
                this.listDel = [];
                var alertError = this.alertCtrl.create({
                  title: 'Erro',
                  subTitle: 'Nenhum registro encontrado',
                  buttons: ['OK']
                });
                alertError.present();
              }
            })
        } else {
          this.comprador.novo = true;
        }

      } else {
        var alertError = this.alertCtrl.create({
          title: 'Erro de CPF',
          subTitle: 'CPF Inválido',
          buttons: ['OK']
        });
        alertError.present();
      }

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



  delVenda(id) {
    var tipo = this.comprador.tipo=='0' ? 'aluno' : 'convidado';
    this.service.delVenda('delVenda',id,tipo)
    .subscribe((data:Data) =>{
      if(data.jsonRetorno.length > 0) {
        var alertError2 = this.alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Deletado com sucesso',
          buttons: ['OK']
        });
        alertError2.present();
        this.getInfos();
      } else {
        var alertError = this.alertCtrl.create({
          title: 'Erro ao deletar',
          subTitle: 'tente mais tarde',
          buttons: ['OK']
        });
        alertError.present();
      }
    })
  }
  updateVenda() {
    if (this.comprador.tipo == '0') {
      this.comprador.valor = ((this.comprador.ingresso == 'Pista' || !this.festa_config.flag_camarote ? (this.lotes_pista_aluno[this.festa_config.lote_ativo - 1].label) : (this.lotes_camarote_aluno[this.festa_config.lote_ativo - 1].label)) - (this.comprador.alimento ? 5 : 0))
      this.service.updateVenda(
        'update_venda',
        this.comprador.id,
        this.vendedor.id,
        this.comprador.valor.toString(),
        this.comprador.alimento ? "1" : "0",
        this.comprador.sexo,
        this.festa_config.lote_ativo.toString(),
        this.festa_config.id_festa
      )
        .subscribe((data: Data) => {
          if (data.message) {
            this.zerarForm('save');

          } else {

            var alert = this.alertCtrl.create({
              title: 'Erro ao finalizar venda',
              subTitle: 'Venda já registrada em ' + data.jsonRetorno[0].data_venda + ' .',
              buttons: ['OK']
            });
            alert.present();

          }
        })
    } else if (this.comprador.tipo == '1') {
      this.comprador.valor = ((this.comprador.ingresso == 'Pista' || !this.festa_config.flag_camarote ? (this.lotes_pista_naluno[this.festa_config.lote_ativo - 1].label) : (this.lotes_camarote_naluno[this.festa_config.lote_ativo - 1].label)) - (this.comprador.alimento ? 5 : 0))
      this.service.updateVendaConvidado(
        'update_venda_convidado',
        this.comprador.registro,
        this.vendedor.id,
        this.comprador.valor.toString(),
        this.comprador.alimento ? "1" : "0",
        this.comprador.sexo,
        this.comprador.nome,
        this.festa_config.lote_ativo.toString(),
        this.festa_config.id_festa
      )
        .subscribe((data: Data) => {
          if (data.message) {
            this.zerarForm('save');

          } else {

            var alert = this.alertCtrl.create({
              title: 'Erro ao finalizar venda',
              subTitle: 'Venda já registrada em ' + data.jsonRetorno[0].data_venda + ' .',
              buttons: ['OK']
            });
            alert.present();

          }
        })



    }

  }

  zerarForm(evento) {
    this.comprador.id = null;
    this.comprador.nome = null;
    this.comprador.sexo = null;
    this.comprador.novo = null;
    this.comprador.registro = evento == 'save' ? null : this.comprador.registro;
    this.buscar = true;

  }
  registroChange() {
    if (this.comprador.tipo == '0' && this.comprador.registro.length < 10 && this.comprador.nome) {
      this.zerarForm('change');

    } else if (this.comprador.tipo == '1' && this.comprador.registro.length < 14 && (this.comprador.nome || this.comprador.novo)) {
      this.zerarForm('change');
    }
  }

  getComboFesta() {
    this.service.getComboLote('get_lotes', this.festa_config.id_festa)
      .subscribe((data: Data) => {
        if (data.message) {
          this.lotes_pista_aluno = data.jsonRetorno.filter(function (d) { return d.tipo == 'pista' && d.aluno == 'aluno' });
          this.lotes_pista_naluno = data.jsonRetorno.filter(function (d) { return d.tipo == 'pista' && d.aluno == 'naluno' });
          this.lotes_camarote_aluno = data.jsonRetorno.filter(function (d) { return d.tipo == 'camarote' && d.aluno == 'aluno' });
          this.lotes_camarote_naluno = data.jsonRetorno.filter(function (d) { return d.tipo == 'camarote' && d.aluno == 'naluno' });

        }
      })

  }

  getFesta() {
    this.service.getFesta('get_festa')
      .subscribe((data: Data) => {
        if (data.message) {
          this.festa_config = data.jsonRetorno[0];
          this.festa_config.lote_ativo = 1;
          this.getComboFesta();
        }
      })

  }

  TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(/[^\d]+/g, '');
    if (strCPF == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (var j = 1; j <= 10; j++) Soma = Soma + parseInt(strCPF.substring(j - 1, j)) * (12 - j);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }


}
