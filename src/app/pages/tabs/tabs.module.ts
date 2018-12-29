import {NgModule} from '@angular/core';

import {TabsPageRoutingModule} from './tabs.router.module';
import {TabsPage} from './tabs.page';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabUiModule} from '../tab-ui/tab-ui.module';
import {TabComponentPageModule} from '../tab-component/tab-component.module';
import {TabZorroAntModule} from '../tab-zorro-ant/tab-zorro-ant.module';

@NgModule({
    declarations: [
        TabsPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule,
        TabUiModule,
        TabComponentPageModule,
        TabZorroAntModule,
    ]
})
export class TabsPageModule {
}