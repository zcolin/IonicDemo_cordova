import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZFilechooserGroupComponent} from './z-filechooser-group';
import {IonicModule} from '@ionic/angular';
import {ZFilechooserModule} from '../z-filechooser/z-filechooser.module';
import {ZBannerModule} from '../z-banner/z-banner.module';

@NgModule({
    declarations: [
        ZFilechooserGroupComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        ZFilechooserModule,
        ZBannerModule
    ],
    exports: [
        ZFilechooserGroupComponent,
    ]
})
export class ZFilechooserGroupModule {
}
