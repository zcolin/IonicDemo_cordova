import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'z-reload',
    templateUrl: 'z-reload.html'
})
/**
 * 加载出错，点击重新加载控件
 */
export class ZReloadComponent {
    @Input() imageWidth = '70px';
    @Input() imageHeight = '70px';
    @Output() reload = new EventEmitter();
    constructor() {
    }

    clickItem() {
        this.reload.emit();
    }
}
