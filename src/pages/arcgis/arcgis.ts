import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage } from 'ionic-angular';
import { ArcgisMapComponent } from '../../components/arcgis-map/arcgis-map';

@IonicPage()
@Component({
    selector: 'page-arcgis',
    templateUrl: 'arcgis.html'
})
export class ArcgisPage {
    @ViewChild('arcgismap') arcgisMap: ArcgisMapComponent;

    constructor(public platform: Platform) {

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
