import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JsBridgePage } from './js-bridge';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        JsBridgePage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(JsBridgePage),
    ],
})
export class JsBridgePageModule { }
