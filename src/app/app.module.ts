import { ModalFromRightLeave, ModalFromRightEnter } from './modal-transitions';
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicErrorHandler, IonicModule, Config } from "ionic-angular";
import { MyApp } from "./app.component";
import { ProviderModule } from "../providers/provider.module";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        ProviderModule,
        ionicGalleryModal.GalleryModalModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '返回',
            tabsHideOnSubPages: true,
            modalEnter: 'modal-slide-in',
            modalLeave: 'modal-slide-out',
            pageTransition: 'ios-transition',
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig, }
    ]
})
export class AppModule {
    constructor(public config: Config) {
        this.setCustomTransitions();
    }

    private setCustomTransitions() {
        this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
        this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
    }
}
