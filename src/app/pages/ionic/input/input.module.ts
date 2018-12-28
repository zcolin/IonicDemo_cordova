import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {InputPage} from './input.page';
import {ZComponentsModule} from '../../../frame/components/z-components.module';

const routes: Routes = [
    {
        path: '',
        component: InputPage
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
    declarations: [InputPage]
})
export class InputPageModule {
}
