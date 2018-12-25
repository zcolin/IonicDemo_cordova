import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {ZProviderModule} from './frame/services/z-provider.module';
import {ProviderModule} from './services/provider.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        ZProviderModule,
        AppRoutingModule,
        ProviderModule,
        IonicModule.forRoot({
            mode: 'md',
            backButtonText: '返回',
        }),
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
