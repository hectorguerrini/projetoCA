import { Storage } from "@ionic/storage";

import { Injectable } from '@angular/core';

import { Usuario } from '../../app/models/usuario';

@Injectable()
export class Session {
  constructor(public storage: Storage) {}
  // setando uma seção e passando o tipo de usuário
  create(usuario: Usuario) {
    this.storage.set("usuario", usuario);
  }

  get(): Promise<any> {
    return this.storage.get("usuario");
  }

  // Quando deslogar deve remova do storage
  remove() {
    this.storage.remove("usuario");
  }

}
