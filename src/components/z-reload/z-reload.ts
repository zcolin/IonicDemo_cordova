/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * 加载出错，点击重新加载控件
 */
@Component({
    selector: 'z-reload',
    templateUrl: 'z-reload.html'
})
export class ZReloadComponent {
    @Input() imageWidth = '70px';       //图片宽度
    @Input() imageHeight = '70px';      //图片高度
    @Output() reload = new EventEmitter();

    constructor() {
    }

    clickItem() {
        this.reload.emit();
    }
}
