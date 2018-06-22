import { Component, AfterContentInit, Input } from '@angular/core';
import { loadModules } from 'esri-loader';
import { TiandituBaseLayer } from './layer/TiandituBaseLayer';
import { GaodeBaseLayer } from './layer/GaodeBaseLayer';
import { BaiduBaseLayer } from './layer/BaiduBaseLayer';
import { BaseLayer } from './layer/BaseLayer';
import { GoogleBaseLayer } from './layer/GoogleBaseLayer';

/**
 *arcgis 地图封装
 */
@Component({
    selector: 'arcgis-map',
    templateUrl: 'arcgis-map.html'
})
export class ArcgisMapComponent implements AfterContentInit {
    mapView;
    baseMap: any[];                     //底图图层集合
    _center?: number[] = [108.443, 74]; //初始中心点
    _zoom?: number = 8;                 //初始缩放
    _baseMapTrade?: 'tianditu' | 'baidu' | 'gaode' | 'google' = 'tianditu';//底图提供厂商类型，天地图 、百度、高德
    _baseMapType?: 'vec' | 'img' = 'vec';//地图类型，矢量图、影像图


    constructor() {
    }

    ngAfterContentInit() {
        this.initMap();
    }


    @Input() set zoom(zoom: number) {
        this._zoom = zoom;
        if (this.mapView) {
            this.mapView.zoom = zoom;
        }
    }

    @Input() set center(center) {
        this._center = center;
        if (this.mapView) {
            this.mapView.goTo(center);
        }
    }

    @Input() set baseMapTrade(baseMapTrade: 'tianditu' | 'baidu' | 'gaode' | 'google') {
        if (baseMapTrade !== this._baseMapTrade) {
            this._baseMapTrade = baseMapTrade;
            if (this.mapView) {
                let baseLayer = this.getBaseLayer();
                baseLayer.getBaseMaps()
                    .then((basemap: any[]) => {
                        this.baseMap = basemap;
                    }).then(() => {
                        this.mapView.map.basemap = this.baseMap[this._baseMapType === 'vec' ? 0 : 1];
                        this.mapView.constraints.minZoom = baseLayer.getMinZoom();
                        this.mapView.constraints.maxZoom = baseLayer.getMaxZoom();
                    });
            }
        }
    }

    @Input() set baseMapType(baseMapType: 'vec' | 'img') {
        if (baseMapType !== this._baseMapType) {
            this._baseMapType = baseMapType;
            if (this.mapView) {
                this.mapView.map.basemap = this.baseMap[this._baseMapType === 'vec' ? 0 : 1];
            }
        }
    }

    /**
     * 切换底图,如矢量图、影像图
     */
    public toggleBaseMapType() {
        if (this.mapView) {
            if (this._baseMapType === 'vec') {
                this.mapView.map.basemap = this.baseMap[1];
            } else {
                this.mapView.map.basemap = this.baseMap[0];
            }
        }
    }

    public initMap() {
        let baseLayer = this.getBaseLayer();
        baseLayer.getBaseMaps()
            .then((basemap: any[]) => {
                this.baseMap = basemap;
            }).then(() => {
                return loadModules([
                    "esri/Map",
                    "esri/views/MapView",
                    "esri/geometry/Extent",
                    "esri/geometry/SpatialReference",
                    "esri/widgets/BasemapToggle",
                    "dojo/domReady!"
                ])
            }).then(([Map, MapView, Extent, SpatialReference, BasemapToggle]) => {
                let baseLayer = this.getBaseLayer();
                let map = new Map({
                    basemap: this.baseMap[0],
                });

                //设置mapview
                this.mapView = new MapView({
                    container: "th-arcgis-map-div",
                    map: map,
                    logo: false,
                    constraints: {
                        minZoom: baseLayer.getMinZoom(),
                        maxZoom: baseLayer.getMaxZoom(),
                        // rotationEnabled: false,//地图是否可以旋转画布
                    },
                    center: this._center,
                    zoom: this._zoom,
                });
                this.mapView.ui.move("zoom", "bottom-right");//放大缩小移动到右上角
                this.mapView.ui.remove(["attribution"]);//移除esri的logo
                // view.ui.remove("zoom");      //去除放大缩小键

                /*禁用手机端双指旋转 */
                this.mapView.watch("rotation", (newValue, oldValue, propertyName) => {
                    if (this.mapView.rotation !== 0) {
                        this.mapView.rotation = 0;
                    }
                });
            }).catch(err => {
                console.log("ArcGISMap: " + err);
            });
    }

    /**
     * 根据底图类型获取底图实例
     */
    private getBaseLayer(): BaseLayer {
        let baseLayer;
        if (this._baseMapTrade === 'baidu') {
            baseLayer = new BaiduBaseLayer();
        } else if (this._baseMapTrade === 'gaode') {
            baseLayer = new GaodeBaseLayer();
        } else if (this._baseMapTrade === 'google') {
            baseLayer = new GoogleBaseLayer();
        } else {
            baseLayer = new TiandituBaseLayer();
        }
        return baseLayer;
    }
}
