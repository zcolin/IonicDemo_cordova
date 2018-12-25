import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ZHttpService} from '../httpservice/z-http.service';
import {ZUiService} from './z-ui.service';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [
        HttpClientModule,
    ],
    providers: [
        ZHttpService,
        ZUiService,
    ]
})
export class ZProviderModule {
}
