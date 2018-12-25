import {NgModule} from '@angular/core';
import {AMapPage} from './amap';
import {ZComponentsModule} from '../../frame/components/z-components.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AMapModule} from '../../frame/components/a-map/a-map.module';

@NgModule({
    declarations: [
        AMapPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        AMapModule,
        RouterModule.forChild([{path: '', component: AMapPage}])
    ],
})
export class AMapPageModule {
}
