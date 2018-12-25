import {Component, OnInit} from '@angular/core';
import {PageUtil} from '../../frame/utils/page.util';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab-component-demo',
    templateUrl: './tab-component-demo.page.html',
    styleUrls: ['./tab-component-demo.page.scss'],
})
export class TabComponentDemoPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    startECharts() {
        PageUtil.startPage(this.navCtrl, '/echarts');
    }

    startAMap() {
        PageUtil.startPage(this.navCtrl, '/amap');
    }

    startArcgis() {
        PageUtil.startPage(this.navCtrl, '/arcgis');
    }

    startJSBridge() {
        PageUtil.startPage(this.navCtrl, '/jsbridge');
    }
}
