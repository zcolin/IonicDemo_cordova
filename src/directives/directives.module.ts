import { StopPropagationDirective } from './stop-propagation';
import { NgModule } from '@angular/core';
import { FixedScrollDirective } from './fixed-scroll';
import { NoFrozenContent } from './no-frozen-content';
import { NoFrozenScroll } from './no-frozen-scroll';
@NgModule({
    declarations: [
        StopPropagationDirective,
        FixedScrollDirective,
        NoFrozenScroll,
        NoFrozenContent,
    ],
    exports: [
        StopPropagationDirective,
        FixedScrollDirective,
        NoFrozenScroll,
        NoFrozenContent,
    ]
})
export class DirectivesModule { }
