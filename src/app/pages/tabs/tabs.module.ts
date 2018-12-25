import {NgModule} from '@angular/core';

import {TabsPageRoutingModule} from './tabs.router.module';
import {TabsPage} from './tabs.page';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabUiDemoModule} from '../tab-ui-demo/tab-ui-demo.module';
import {TabComponentDemoPageModule} from '../tab-component-demo/tab-component-demo.module';

@NgModule({
    declarations: [
        TabsPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule,
        TabUiDemoModule,
        TabComponentDemoPageModule,
    ]
})
export class TabsPageModule {
}
