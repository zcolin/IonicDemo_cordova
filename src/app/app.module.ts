import { ModalFromRightLeave, ModalFromRightEnter } from './modal-transitions';
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicErrorHandler, IonicModule, Config } from "ionic-angular";
import { MyApp } from "./app.component";
import { ProviderModule } from "../providers/provider.module";
@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        ProviderModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '返回'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
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
