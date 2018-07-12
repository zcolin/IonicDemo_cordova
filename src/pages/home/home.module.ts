import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { ZFilechooserModule } from '../../components/z-filechooser/z-filechooser.module';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        ComponentsModule,
        ZFilechooserModule,
        IonicPageModule.forChild(HomePage),
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule { }
