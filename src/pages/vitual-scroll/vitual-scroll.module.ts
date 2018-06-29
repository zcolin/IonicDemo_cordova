import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VitualScrollPage } from './vitual-scroll';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        VitualScrollPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(VitualScrollPage),
    ],
})
export class VitualScrollPageModule { }
