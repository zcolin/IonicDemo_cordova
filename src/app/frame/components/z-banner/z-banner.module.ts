import {NgModule} from '@angular/core';
import {ZBannerComponent} from './z-banner';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ZBannerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    entryComponents: [
        ZBannerComponent
    ],
    exports: [
        ZBannerComponent,
    ]
})
export class ZBannerModule {
}
