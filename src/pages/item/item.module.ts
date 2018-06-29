import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemPage } from './item';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ItemPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ItemPage),
    ],
})
export class ItemPageModule { }
