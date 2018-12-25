import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {TabComponentDemoPage} from './tab-component-demo.page';
import {EchartsPageModule} from '../echarts/echarts.module';
import {JsBridgePageModule} from '../js-bridge/js-bridge.module';
import {AMapPageModule} from '../amap/amap.module';
import {ArcgisPageModule} from '../arcgis/arcgis.module';
import {ZComponentsModule} from '../../frame/components/z-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EchartsPageModule,
        AMapPageModule,
        ArcgisPageModule,
        ZComponentsModule,
        JsBridgePageModule,
        RouterModule.forChild([
            {
                path: '',
                component: TabComponentDemoPage
            }
        ])
    ],
    declarations: [TabComponentDemoPage],
    exports: [TabComponentDemoPage]
})
export class TabComponentDemoPageModule {
}
