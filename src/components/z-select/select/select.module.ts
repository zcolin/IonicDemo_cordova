import { DirectivesModule } from './../../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPage } from './select';

@NgModule({
    declarations: [
        SelectPage,
    ],
    imports: [
        DirectivesModule,
        IonicPageModule.forChild(SelectPage)
    ],
})
export class SelectPageModule { }
