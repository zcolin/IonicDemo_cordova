import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {TabComponentPage} from './tab-component.page';
import {ZComponentsModule} from '../../frame/components/z-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: TabComponentPage
            }
        ])
    ],
    declarations: [TabComponentPage],
    exports: [TabComponentPage]
})
export class TabComponentModule {
}
