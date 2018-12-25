import {Component} from '@angular/core';
import {ZLogUtil} from '../../frame/utils/z-log.util';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    constructor() {
        ZLogUtil.log('xx');
    }
}
