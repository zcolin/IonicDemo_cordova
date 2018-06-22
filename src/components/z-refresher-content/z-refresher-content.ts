import { Component, Input } from '@angular/core';

@Component({
    selector: 'z-refresher-content',
    templateUrl: 'z-refresher-content.html'
})
/**
 * refresherContent设置默认样式
 */
export class ZRefresherContentComponent {
    @Input() pullingIcon: string = 'arrow-dropdown';
    @Input() pullingText: string = '下拉刷新';
    @Input() refreshingSpinner: string = 'circles';
    @Input() refreshingText: string = '刷新中...';

    constructor() {
    }
}
