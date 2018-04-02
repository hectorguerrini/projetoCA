import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings';
import { IonicModule } from 'ionic-angular';
import { ConfigFestaComponent } from './config-festa/config-festa';
import { DirectivesModule } from "../directives/directives.module";
@NgModule({
	declarations: [SettingsComponent,
    ConfigFestaComponent],
	imports: [IonicModule,DirectivesModule],
	exports: [SettingsComponent,
    ConfigFestaComponent]
})
export class ComponentsModule {}
