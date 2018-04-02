import { Directive } from '@angular/core';
import { NgModel } from '@angular/forms';
/**
 * Generated class for the MaskMoneyDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[mask-money]', // Attribute selector
  host: {
    '(keyup)': 'onInputChange($event)'
  }
})
export class MaskMoneyDirective {

  constructor( public model: NgModel) {

  }
  onInputChange(ev) {
    var valor = this.model.value.replace(/\D/g, '');

    if (ev.keyCode == 8) {
      return;
    }



    valor= "R$ "+valor

    this.model.viewToModelUpdate(this.model.value);
    this.model.valueAccessor.writeValue(valor)
  }
}
