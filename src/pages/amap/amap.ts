import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AMapComponent } from '../../components/a-map/a-map';
import { LocationPluginOption, ToolBarPluginOption } from '../../components/a-map/a-map.option';
import { UiService } from '../../providers/ui.service';

@IonicPage()
@Component({
    selector: 'page-amap',
    templateUrl: 'amap.html',
})
export class AMapPage {
    @ViewChild('amap') aMap: AMapComponent;
    constructor(public navCtrl: NavController, private uiService: UiService, public viewCrl: ViewController) {
    }

    ionViewDidEnter() {
        this.addLocationWidget();
        this.addToolBar();
        this.addScale();
        this.addMapType();
    }

    addLocationWidget() {
        let option: LocationPluginOption = {
            maximumAge: 5000,                       //定位结果缓存0毫秒，默认：0
            zoomToAccuracy: true,                   //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        }
        this.aMap.addLocationPlugin(option).subscribe(geolocation => {
            AMap.event.addListener(geolocation, 'complete', (info) => {
                this.uiService.showAlert(JSON.stringify(info));
            });
            AMap.event.addListener(geolocation, 'error', (error) => {
                this.uiService.showAlert(JSON.stringify(error));
            });
        });
    }

    addToolBar() {
        this.aMap.addToolBarPlugin().subscribe(toolbar => {

        });
    }
    addScale() {
        this.aMap.addScalePlugin().subscribe((scale) => {

        });
    }

    addMapType() {
        this.aMap.addMapTypePlugin().subscribe((mapType) => {

        });
    }
}
