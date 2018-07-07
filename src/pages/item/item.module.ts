import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemPage } from './item';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    declarations: [
        ItemPage,
    ],
    imports: [
        DirectivesModule,
        ComponentsModule,
        IonicPageModule.forChild(ItemPage),
    ],
})
export class ItemPageModule { }
