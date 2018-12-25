import {NgModule} from '@angular/core';
import {ZTextAreaAutoSizeDirective} from './z-text-area-auto-size.directive';
import {ZStopPropagationDirective} from './z-stop-propagation';

@NgModule({
    declarations: [
        ZStopPropagationDirective,
        ZTextAreaAutoSizeDirective,
    ],
    exports: [
        ZStopPropagationDirective,
        ZTextAreaAutoSizeDirective,
    ]
})
export class ZDirectivesModule {
}

