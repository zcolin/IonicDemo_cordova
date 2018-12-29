import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AntUiGatherPage} from './ant-ui-gather.page';
import {ZComponentsModule} from '../../../frame/components/z-components.module';
import {ActionSheetComponent, NgZorroAntdMobileModule, ToastComponent} from 'ng-zorro-antd-mobile';

const routes: Routes = [
    {
        path: '',
        component: AntUiGatherPage
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
    entryComponents: [ActionSheetComponent, ToastComponent],
    declarations: [AntUiGatherPage]
})
export class AntUiGatherPageModule {
}
