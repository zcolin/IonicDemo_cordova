import {NgModule} from '@angular/core';
import {ArcgisPage} from './arcgis';
import {ArcgisMapModule} from '../../frame/components/arcgis-map/arcgis-map.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ZComponentsModule} from '../../frame/components/z-components.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        ArcgisPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        ArcgisMapModule,
        RouterModule.forChild([{path: '', component: ArcgisPage}])
    ]
})
export class ArcgisPageModule {
}
