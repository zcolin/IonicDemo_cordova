import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

/**
 * TextArea自动调整大小
 */
@Directive({
    selector: '[zTextAreaAutoSize]' // Attribute selector
})
export class ZTextAreaAutoSizeDirective implements OnInit {

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
        textArea.style.height = textArea.scrollHeight + 20 + 'px'; // 20为padding值
    }
}
