import {AfterContentInit, Component, Input} from '@angular/core';
import {loadModules} from 'esri-loader';
import {TiandituBaseLayer} from './layer/TiandituBaseLayer';
import {GaodeBaseLayer} from './layer/GaodeBaseLayer';
import {BaiduBaseLayer} from './layer/BaiduBaseLayer';
import {BaseLayer} from './layer/BaseLayer';
import {GoogleBaseLayer} from './layer/GoogleBaseLayer';

/**
 *arcgis 地图封装
 */
@Component({
    selector: 'arcgis-map',
    templateUrl: 'arcgis-map.html',
    styleUrls: ['arcgis-map.scss']
})
export class ArcgisMapComponent implements AfterContentInit {
    private _mapView;
    private _baseMap: any[];                        // 底图图层集合
    private _center?: number[] = [108.443, 74];     // 初始中心点
    private _zoom = 8;                              // 初始缩放
    private _baseMapTrade?: 'tianditu' | 'baidu' | 'gaode' | 'google' = 'tianditu'; // 底图提供厂商类型，天地图 、百度、高德
    private _baseMapType?: 'vec' | 'img' = 'vec';   // 地图类型，矢量图、影像图

    constructor() {
    }

    ngAfterContentInit() {
        this.initMap();
    }

    public initMap() {
        const baseLayer = this.getBaseLayer();
        baseLayer.getBaseMaps()
                 .then((basemap: any[]) => {
                     this._baseMap = basemap;
                 }).then(() => {
            return loadModules([
                'esri/Map',
                'esri/views/MapView',
                'esri/geometry/Extent',
                'esri/geometry/SpatialReference',
                'esri/widgets/BasemapToggle',
                'dojo/domReady!'
            ]);
        }).then(([Map, MapView, Extent, SpatialReference, BasemapToggle]) => {
            const bLayer = this.getBaseLayer();
            const map = new Map({
                basemap: this._baseMap[0],
            });

            // 设置mapview
            this._mapView = new MapView({
                container: 'th-arcgis-map-div',
                map: map,
                logo: false,
                constraints: {
                    minZoom: bLayer.getMinZoom(),
                    maxZoom: bLayer.getMaxZoom(),
                    // rotationEnabled: false,//地图是否可以旋转画布
                },
                center: this._center,
                zoom: this._zoom,
            });
            this._mapView.ui.move('zoom', 'bottom-right'); // 放大缩小移动到右上角
            this._mapView.ui.remove(['attribution']); // 移除esri的logo
            // view.ui.remove("zoom");      //去除放大缩小键

            /*禁用手机端双指旋转 */
            this._mapView.watch('rotation', (newValue, oldValue, propertyName) => {
                if (this._mapView.rotation !== 0) {
                    this._mapView.rotation = 0;
                }
            });
        }).catch(err => {
            console.log('ArcGISMap: ' + err);
        });
    }

    getMapView() {
        return this._mapView;
    }

    get baseMap(): any[] {
        return this._baseMap;
    }

    @Input() set zoom(zoom: number) {
        this._zoom = zoom;
        if (this._mapView) {
            this._mapView.zoom = zoom;
        }
    }

    @Input() set center(center) {
        this._center = center;
        if (this._mapView) {
            this._mapView.goTo(center);
        }
    }

    @Input() set baseMapTrade(baseMapTrade: 'tianditu' | 'baidu' | 'gaode' | 'google') {
        if (baseMapTrade !== this._baseMapTrade) {
            this._baseMapTrade = baseMapTrade;
            if (this._mapView) {
                const baseLayer = this.getBaseLayer();
                baseLayer.getBaseMaps()
                         .then((basemap: any[]) => {
                             this._baseMap = basemap;
                         }).then(() => {
                    this._mapView.map.basemap = this._baseMap[this._baseMapType === 'vec' ? 0 : 1];
                    this._mapView.constraints.minZoom = baseLayer.getMinZoom();
                    this._mapView.constraints.maxZoom = baseLayer.getMaxZoom();
                });
            }
        }
    }

    @Input() set baseMapType(baseMapType: 'vec' | 'img') {
        if (baseMapType !== this._baseMapType) {
            this._baseMapType = baseMapType;
            if (this._mapView) {
                this._mapView.map.basemap = this._baseMap[this._baseMapType === 'vec' ? 0 : 1];
            }
        }
    }

    /**
     * 切换底图,如矢量图、影像图
     */
    public toggleBaseMapType() {
        if (this._mapView) {
            if (this._baseMapType === 'vec') {
                this._mapView.map.basemap = this._baseMap[1];
            } else {
                this._mapView.map.basemap = this._baseMap[0];
            }
        }
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
