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
    templateUrl: 'z-refresher-content.html',
    styleUrls: ['z-refresher-content.scss']
})
export class ZRefresherContentComponent {
    @Input() pullingIcon = 'arrow-dropdown';
    @Input() pullingText = '下拉刷新';
    @Input() refreshingSpinner = 'circles';
    @Input() refreshingText = '刷新中...';

    constructor() {
    }
}
