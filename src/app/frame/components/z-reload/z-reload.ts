import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * 加载出错，点击重新加载控件
 */
@Component({
    selector: 'z-reload',
    templateUrl: 'z-reload.html',
    styleUrls: ['z-reload.scss']
})
export class ZReloadComponent {
    @Input() imageWidth = '70px';       // 图片宽度
    @Input() imageHeight = '70px';      // 图片高度
    @Output() reload = new EventEmitter();

    constructor() {
    }

    clickItem() {
        this.reload.emit();
    }
}
