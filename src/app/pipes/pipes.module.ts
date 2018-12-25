import {NgModule} from '@angular/core';
import {ZDatePipe} from './z-date';
import {TrustHtmlPipe} from './trust-html';
import {DecimalDigitPipe} from './decimal-digit';
import {TimeAgoPipe} from './time-ago';

@NgModule({
    declarations: [
        TimeAgoPipe,
        ZDatePipe,
        TrustHtmlPipe,
        DecimalDigitPipe,
    ],
    imports: [],
    exports: [
        TimeAgoPipe,
        ZDatePipe,
        TrustHtmlPipe,
        DecimalDigitPipe,
    ]
})
export class PipesModule {
}
