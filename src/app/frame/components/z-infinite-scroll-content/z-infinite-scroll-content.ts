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
 * infiniteScrollContent设置默认样式
 */
@Component({
    selector: 'z-infinite-scroll-content',
    templateUrl: 'z-infinite-scroll-content.html',
    styleUrls: ['z-infinite-scroll-content.scss']
})
export class ZInfiniteScrollContentComponent {
    @Input() loadingSpinner = 'circles';
    @Input() loadingText = '加载中...';

    constructor() {
    }

}
