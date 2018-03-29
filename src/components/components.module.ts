import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [SettingsComponent],
	imports: [IonicModule],
	exports: [SettingsComponent]
})
export class ComponentsModule {}
