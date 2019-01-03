import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {F2ChartsPage} from './f2-charts.page';
import {ZComponentsModule} from '../../frame/components/z-components.module';

const routes: Routes = [
    {
        path: '',
        component: F2ChartsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [F2ChartsPage]
})
export class F2ChartsPageModule {
}
