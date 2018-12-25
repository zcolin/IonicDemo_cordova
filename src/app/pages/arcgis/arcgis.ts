import {Component, ViewChild} from '@angular/core';
import {ArcgisMapComponent} from '../../frame/components/arcgis-map/arcgis-map';

@Component({
    selector: 'page-arcgis',
    templateUrl: 'arcgis.html',
    styleUrls: ['arcgis.scss']
})
export class ArcgisPage {
    @ViewChild('arcgismap') arcgisMap: ArcgisMapComponent;

    constructor() {

    }

    switchToVec() {
        this.arcgisMap.baseMapType = 'vec';
    }

    switchToImg() {
        this.arcgisMap.baseMapType = 'img';
    }

    switchToTianditu() {
        this.arcgisMap.baseMapTrade = 'tianditu';
    }

    switchToGaode() {
        this.arcgisMap.baseMapTrade = 'gaode';
    }

    switchToBaidu() {
        this.arcgisMap.baseMapTrade = 'baidu';
    }

    switchToGoogle() {
        this.arcgisMap.baseMapTrade = 'google';
    }
}
