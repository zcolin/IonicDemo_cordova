import { StopPropagationDirective } from './stop-propagation';
import { NgModule } from '@angular/core';
import { FixedScrollDirective } from './fixed-scroll';
@NgModule({
    declarations: [
        StopPropagationDirective,
        FixedScrollDirective,
    ],
    exports: [
        StopPropagationDirective,
        FixedScrollDirective,
    ]
})
export class DirectivesModule { }
