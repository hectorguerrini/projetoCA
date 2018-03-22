import {Directive, Input} from '@angular/core';
import {NgModel} from '@angular/forms';
@Directive({
  selector: '[Mask]',
  host: {
    '(keyup)': 'onInputChange()'
  }
})
export class MaskDirective {


  constructor(
    public model: NgModel,

  ) {

  }
  @Input("Mask") Mask: string;


  onInputChange() {
    var valor = this.model.value.replace(/\D/g, '');
    var pad = this.Mask.replace(/\D/g, '').replace(/9/g, '_');
    var valorMask = valor + pad.substring(0, pad.length - valor.length);



    var valorMaskPos = 0;
    valor = '';
    for (var i = 0; i < this.Mask.length; i++) {
      if (isNaN(parseInt(this.Mask.charAt(i)))) {
        valor += this.Mask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    this.model.viewToModelUpdate(this.model.value);
    this.model.valueAccessor.writeValue(valor)
  }




}