import {TabUiDemoPage} from './tab-ui-demo';
import {NgModule} from '@angular/core';
import {ZFilechooserModule} from '../../frame/components/z-filechooser/z-filechooser.module';
import {ZComponentsModule} from '../../frame/components/z-components.module';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ListPageModule} from '../list-page/list-page.module';
import {ZFilechooserGroupModule} from '../../frame/components/z-filechooser-group/z-filechooser-group.module';

@NgModule({
    declarations: [
        TabUiDemoPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        ZFilechooserModule,
        ZFilechooserGroupModule,
        ListPageModule,
        RouterModule.forChild([
            {
                path: '',
                component: TabUiDemoPage,
            }
        ])
    ],
    exports: [
        TabUiDemoPage
    ]
})
export class TabUiDemoModule {
}
