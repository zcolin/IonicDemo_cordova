import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab-component-demo',
    templateUrl: './tab-component-demo.page.html',
    styleUrls: ['./tab-component-demo.page.scss'],
})
export class TabComponentDemoPage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    startECharts() {
        this.router.navigate(['/echarts']);
    }

    startAMap() {
        this.router.navigate(['/amap']);
    }

    startArcgis() {
        this.router.navigate(['/arcgis']);
    }

    startJSBridge() {
        this.router.navigate(['/jsbridge']);
    }
}
