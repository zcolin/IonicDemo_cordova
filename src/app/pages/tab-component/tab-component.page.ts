import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab-component',
    templateUrl: './tab-component.page.html',
    styleUrls: ['./tab-component.page.scss'],
})
export class TabComponentPage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    startECharts() {
        this.router.navigate(['/echarts']);
    }

    startF2Charts() {
        this.router.navigate(['/f2_charts']);
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
