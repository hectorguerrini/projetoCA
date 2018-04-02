
//classe para criar modelos de objetos
export class Model {
  constructor(objeto?) {
      Object.assign(this, objeto);
  }
}
//classe usuario extendendo a classe Model
export class Festa extends Model {
    nome:string
    lote_ativo:string
    flag_alimento:string
    flag_m_f:string
    local:string
}
