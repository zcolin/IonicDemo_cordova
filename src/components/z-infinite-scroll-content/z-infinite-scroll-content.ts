import { Component, Input } from '@angular/core';

@Component({
    selector: 'z-infinite-scroll-content',
    templateUrl: 'z-infinite-scroll-content.html'
})
/**
 * infiniteScrollContent设置默认样式
 */
export class ZInfiniteScrollContentComponent {
    @Input() loadingSpinner: string = 'bubbles';
    @Input() loadingText: string = '加载中...';

    constructor() {
    }

}
