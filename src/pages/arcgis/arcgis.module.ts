import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArcgisPage } from './arcgis';
import { ArcgisMapModule } from '../../components/arcgis-map/arcgis-map.module';

@NgModule({
    declarations: [
        ArcgisPage,
    ],
    imports: [
        ArcgisMapModule,
        IonicPageModule.forChild(ArcgisPage),
    ]
})
export class ArcgisPageModule { }
