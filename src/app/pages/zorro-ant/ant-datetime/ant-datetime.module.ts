import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AntDatetimePage} from './ant-datetime.page';
import {ZComponentsModule} from '../../../frame/components/z-components.module';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';

const routes: Routes = [
    {
        path: '',
        component: AntDatetimePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        NgZorroAntdMobileModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AntDatetimePage]
})
export class AntDatetimePageModule {
}
