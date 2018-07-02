import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AMapComponent } from '../../components/a-map/a-map';
import { LocationPluginOption, MakerOption } from '../../components/a-map/a-map.option';
import { UiService } from '../../providers/ui.service';

@IonicPage()
@Component({
    selector: 'page-amap',
    templateUrl: 'amap.html',
})
export class AMapPage {
    @ViewChild('amap') aMap: AMapComponent;
    curMapType: number = 0;
    geolocation;
    path: number[][] = [];
    constructor(public navCtrl: NavController, private uiService: UiService, public viewCrl: ViewController) {
    }

    ionViewDidEnter() {
        this.aMap.setZoom(13);
        this.aMap.setCenter([117.13021, 36.67404]);
        this.addLocationWidget();
        this.addToolBar();
        this.addScale();
        this.addMapType();
        this.addMaker();
        this.addPolygon();
        this.addLine();
        this.addCircle();
    }

    addLocationWidget() {
        let option: LocationPluginOption = {
            maximumAge: 5000,                       //定位结果缓存0毫秒，默认：0
            zoomToAccuracy: true,                   //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        }
        this.aMap.addLocationPlugin(option).subscribe(geolocation => {
            this.geolocation = geolocation;
            AMap.event.addListener(geolocation, 'complete', (info) => {
                this.uiService.showAlert(JSON.stringify(info));
            });
            AMap.event.addListener(geolocation, 'error', (error) => {
                this.uiService.showAlert(JSON.stringify(error));
            });
        });
    }

    /**
     * 自定义图标定位
     */
    location() {
        if (this.geolocation) {
            this.geolocation.getCurrentPosition();
        }
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

    /**
     * 自定义按钮切换图层
     */
    toggleMapType() {
        if (this.curMapType == 0) {
            this.aMap.switchToImg();
            this.curMapType = 1;
        } else {
            this.aMap.switchToVec();
            this.curMapType = 0;
        }
    }

    addMaker() {
        let makers = [];
        for (let index = 0; index < 10; index++) {
            let position = [117.13021 + index * 0.01 * Math.random(), 36.67404 + index * 0.01 * Math.random()];
            this.path.push(position);

            let makerOption: MakerOption = {
                offset: new AMap.Pixel(-18, -36),
                position: position,
                extData: `我是第${index}个点`,
                icon: new AMap.Icon({
                    size: new AMap.Size(36, 36),    // 图标尺寸
                    image: '/assets/img/icon_location.png',  // Icon的图像
                    imageSize: new AMap.Size(36, 36)   // 根据所设置的大小拉伸或压缩图片
                })
            };

            makers.push(this.aMap.getMaker(makerOption, (e) => {
                this.uiService.showAlert(e.target.getExtData());
            }));
        }
        let overlayGroup = this.aMap.getOverLayGroup(makers);
        this.aMap.add(overlayGroup);
    }

    addPolygon() {
        this.aMap.addPolygon({ path: this.path }, (e) => { });
    }
    addLine() {
        this.aMap.addLine({ path: this.path }, (e) => { });
    }

    addCircle() {
        this.aMap.addCircle({ center: [117.13021, 36.67404] });
    }
}
