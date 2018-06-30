import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AMapPage } from './amap';
import { ComponentsModule } from '../../components/components.module';
import { AMapModule } from '../../components/a-map/a-map.module';

@NgModule({
    declarations: [
        AMapPage,
    ],
    imports: [
        ComponentsModule,
        AMapModule,
        IonicPageModule.forChild(AMapPage),
    ],
})
export class GdmapPageModule { }
