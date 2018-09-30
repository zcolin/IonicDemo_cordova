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
    templateUrl: 'z-infinite-scroll-content.html'
})
export class ZInfiniteScrollContentComponent {
    @Input() loadingSpinner: string = 'bubbles';
    @Input() loadingText: string = '加载中...';

    constructor() {
    }

}
