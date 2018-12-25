import {NgModule} from '@angular/core';
import {JsBridgePage} from './js-bridge';
import {RouterModule} from '@angular/router';
import {ZComponentsModule} from '../../frame/components/z-components.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        JsBridgePage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        RouterModule.forChild([{path: '', component: JsBridgePage}]),
    ],
})
export class JsBridgePageModule {
}
