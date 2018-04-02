import { NgModule } from '@angular/core';
import { MaskInputDirective } from './mask-input/mask-input';
import { MaskMoneyDirective } from './mask-money/mask-money';
@NgModule({
	declarations: [MaskInputDirective,
    MaskMoneyDirective],
	imports: [],
	exports: [MaskInputDirective,
    MaskMoneyDirective]
})
export class DirectivesModule {}
