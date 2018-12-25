import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

/**
 * 阻止事件冒泡的指令
 */
@Directive({
    selector: '[zClickStop]'
})
export class ZStopPropagationDirective {
    @Output('zClickStop') stopPropEvent = new EventEmitter();

    constructor() {
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.stopPropEvent.emit(event);
        event.stopPropagation();
    }
}
