import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ZComponentsModule} from '../../../frame/components/z-components.module';
import {ListPage} from './list-page';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ListPage,
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ZComponentsModule,
        RouterModule.forChild([{path: '', component: ListPage}]),
    ],
})
export class ListPageModule {
}
