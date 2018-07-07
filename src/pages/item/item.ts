import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-item',
    templateUrl: 'item.html',
})
export class ItemPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ItemPage');
    }

    doRefresh(refresher?: Refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    doInfinite(infiniteScroll?: InfiniteScroll) {
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }

    buttonClick() {

    }

    archive() {

    }
}
