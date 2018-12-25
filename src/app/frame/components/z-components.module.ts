import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ZDirectivesModule} from '../directives/z-directives.module';
import {ZReloadComponent} from './z-reload/z-reload';
import {ZRefresherContentComponent} from './z-refresher-content/z-refresher-content';
import {ZInfiniteScrollContentComponent} from './z-infinite-scroll-content/z-infinite-scroll-content';
import {FormsModule} from '@angular/forms';
import {ZToolbarComponent} from './z-toolbar/z-toolbar';

@NgModule({
    declarations: [
        ZToolbarComponent,
        ZReloadComponent,
        ZRefresherContentComponent,
        ZInfiniteScrollContentComponent,
    ],
    imports: [
        ZDirectivesModule,
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        ZToolbarComponent,
        ZReloadComponent,
        ZRefresherContentComponent,
        ZInfiniteScrollContentComponent,
    ]
})
export class ZComponentsModule {
}
