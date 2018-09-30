/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Directive, ElementRef, HostListener} from "@angular/core";

/**
 * textarea自动调整大小
 */
@Directive({
    selector: '[textarea-autosize]' // Attribute selector
})
export class TextAreaAutoSizeDirective {

    @HostListener('ionChange', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
    }

    ngOnInit(): void {
        setTimeout(() => this.adjust(), 0);
    }

    adjust(): void {
        const textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 20 + 'px';//20为padding值
    }
}
