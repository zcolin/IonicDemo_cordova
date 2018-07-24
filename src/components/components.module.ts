import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ZRefresherContentComponent } from './z-refresher-content/z-refresher-content';
import { DirectivesModule } from '../directives/directives.module';
import { ZPageComponent } from './z-page/z-page';
import { ZInfiniteScrollContentComponent } from './z-infinite-scroll-content/z-infinite-scroll-content';
import { ZReloadComponent } from './z-reload/z-reload';
@NgModule({
    declarations: [
        ZRefresherContentComponent,
        ZInfiniteScrollContentComponent,
        ZPageComponent,
        ZReloadComponent,
    ],
    imports: [
        DirectivesModule,
        CommonModule,
        IonicModule],
    exports: [
        ZRefresherContentComponent,
        ZInfiniteScrollContentComponent,
        ZPageComponent,
        ZReloadComponent,
    ]
})
export class ComponentsModule { }
