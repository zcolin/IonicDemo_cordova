import {NgModule} from '@angular/core';
import {ItemPage} from './item';
import {ZDirectivesModule} from '../../../frame/directives/z-directives.module';
import {ZComponentsModule} from '../../../frame/components/z-components.module';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ZBannerModule} from '../../../frame/components/z-banner/z-banner.module';

@NgModule({
    declarations: [
        ItemPage,
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ZDirectivesModule,
        ZComponentsModule,
        ZBannerModule,
        RouterModule.forChild([{path: '', component: ItemPage}])
    ],
})
export class ItemPageModule {
}
