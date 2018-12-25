import {EchartsPage} from './echarts';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ZComponentsModule} from '../../frame/components/z-components.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        EchartsPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        RouterModule.forChild([{path: '', component: EchartsPage}])
    ],
    exports: [
        EchartsPage
    ]
})
export class EchartsPageModule {
}

