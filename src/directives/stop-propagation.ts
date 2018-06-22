import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[click.stop]'
})
/**
 * 阻止事件冒泡的指令
 */
export class StopPropagationDirective {

    @Output("click.stop") stopPropEvent = new EventEmitter();

    constructor() {
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.stopPropEvent.emit(event);
        event.stopPropagation();
    }
}