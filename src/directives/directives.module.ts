import {StopPropagationDirective} from './stop-propagation';
import {NgModule} from '@angular/core';
import {FixedScrollDirective} from './fixed-scroll';
import {NoFrozenContent} from './no-frozen-content';
import {NoFrozenScroll} from './no-frozen-scroll';
import {TextAreaAutoSizeDirective} from "./textarea-autosize";

@NgModule({
    declarations: [
        StopPropagationDirective,
        FixedScrollDirective,
        NoFrozenScroll,
        NoFrozenContent,
        TextAreaAutoSizeDirective,
    ],
    exports: [
        StopPropagationDirective,
        FixedScrollDirective,
        NoFrozenScroll,
        NoFrozenContent,
        TextAreaAutoSizeDirective,
    ]
})
export class DirectivesModule {
}

