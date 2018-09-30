/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:50
 * ********************************************************
 */

import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

/**
 * 阻止事件冒泡的指令
 */
@Directive({
    selector: '[click.stop]'
})
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
