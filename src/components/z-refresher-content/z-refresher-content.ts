/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Component, Input} from '@angular/core';

/**
 * refresherContent设置默认样式
 */
@Component({
    selector: 'z-refresher-content',
    templateUrl: 'z-refresher-content.html'
})
export class ZRefresherContentComponent {
    @Input() pullingIcon: string = 'arrow-dropdown';
    @Input() pullingText: string = '下拉刷新';
    @Input() refreshingSpinner: string = 'circles';
    @Input() refreshingText: string = '刷新中...';

    constructor() {
    }
}
