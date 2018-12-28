import {Component} from '@angular/core';
import {ZBannerEntity} from '../../../frame/components/z-banner/z-banner-entity';

@Component({
    selector: 'page-item',
    templateUrl: 'item.html',
    styleUrls: ['item.scss']
})
export class ItemPage {
    listPic: ZBannerEntity[] = [];

    constructor() {
        this.listPic = [{id: '11', title: 'XXX', image_path: 'xxxx'}, {id: '11', title: 'XXX', image_path: 'xxxx'}];
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    doInfinite(event) {
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    buttonClick() {

    }

    archive() {

    }
}
