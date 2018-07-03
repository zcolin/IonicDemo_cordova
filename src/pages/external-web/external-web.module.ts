import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExternalWebPage } from './external-web';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ExternalWebPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ExternalWebPage),
    ],
})
export class ExternalWebPageModule { }
