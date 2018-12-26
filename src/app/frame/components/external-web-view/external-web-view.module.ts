import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ExternalWebViewPage} from './external-web-view.page';
import {ZComponentsModule} from '../z-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ZComponentsModule,
    ],
    declarations: [ExternalWebViewPage],
    entryComponents: [ExternalWebViewPage]
})
export class ExternalWebViewPageModule {
}
