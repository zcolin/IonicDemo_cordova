import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {TabZorroAntPage} from './tab-zorro-ant.page';
import {ZComponentsModule} from '../../frame/components/z-components.module';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {AntTabsPageModule} from '../zorro-ant/ant-tabs/ant-tabs.module';
import {AntDatetimePageModule} from '../zorro-ant/ant-datetime/ant-datetime.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        NgZorroAntdMobileModule,
        AntDatetimePageModule,
        AntTabsPageModule,
        RouterModule.forChild([
            {
                path: '',
                component: TabZorroAntPage
            }
        ])
    ],
    declarations: [TabZorroAntPage],
    exports: [TabZorroAntPage]
})
export class TabZorroAntModule {
}
