import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlBarPluginOption, MapTypePluginOption, ToolBarPluginOption, LocationPluginOption, MakerOption, LineOption, CircleMakerOption, AdvancedInfoWindowOption, SearchNearOption, PolygonOption, ScalePluginOption } from './a-map.option';

@Component({
    selector: 'a-map',
    templateUrl: 'a-map.html'
})
export class AMapComponent {
    private _mapView;
    private _center?: number[]; //初始中心点
    private _zoom?: number = 13;                         //初始缩放

    @ViewChild('panel') panel: ElementRef
    constructor() {

    }

    ngAfterContentInit() {
        this.loadMap();
    }

    loadMap() {
        this._mapView = new AMap.Map('amap-container', {
            center: this._center,
            resizeEnable: true,
            zoom: this._zoom,
        });
    }

    get mapView() {
        return this._mapView;
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

    /**
     * 增加地理/反地理编码插件
     */
    addGeoCoderPlugin() {
        return new Observable(observer => {
            AMap.service('AMap.Geocoder', () => {
                observer.next(new AMap.Geocoder());
            });
        });
    }

    /**
     * 增加周边搜索插件
     * @param option 
     */
    addSearchNearPlugin(option: SearchNearOption) {
        return new Observable(observer => {
            this._mapView.plugin('AMap.PlaceSearch', () => {
                let placeSearch = new AMap.PlaceSearch({
                    city: option.city,
                    citylimit: option.citylimit || false,
                    type: option.type,
                    pageSize: option.pageSize || 20,
                    extensions: option.extensions || 'base',
                    pageIndex: option.pageIndex || 1,
                    panel: option.panel || 'panel',
                    atuoFitView: option.atuoFitView || true,
                    map: this._mapView
                });
                observer.next(placeSearch);
            });
        });
    }

    /**
     * 增加地图控件组件
     * @param showTraffic 
     * @param showRoad 
     */
    addControlBarPlugin(option?: ControlBarPluginOption): Observable<any> {
        return new Observable(observer => {
            this._mapView.plugin(["AMap.ControlBar"], () => {
                option = option || new ControlBarPluginOption();
                let controlBar = new AMap.ControlBar({
                    position: option.position || { top: '10px', right: '10px' },
                    showZoomBar: option.showZoomBar || true,
                    showControlButton: option.showControlButton || true,
                });
                this._mapView.addControl(controlBar)
                observer.next(controlBar)
            })
        });
    }
    /**
     * 增加地图图层切换组件
     * @param showTraffic 
     * @param showRoad 
     */
    addMapTypePlugin(option?: MapTypePluginOption): Observable<any> {
        return new Observable(observer => {
            this._mapView.plugin(["AMap.MapType"], () => {
                option = option || new MapTypePluginOption();
                let mapType = new AMap.MapType({
                    defaultType: option.defaultType || 0, // 取值为0：默认底图  取值为1：卫星图 默认值：0
                    showTraffic: option.showTraffic || true,
                    showRoad: option.showRoad || true,
                });
                this._mapView.addControl(mapType);
                observer.next(mapType)
            })
        });
    }

    /**
     * 增加地图比例尺组件
     * @param showTraffic
     * @param showRoad
     */
    addScalePlugin(option?: ScalePluginOption): Observable<any> {
        return new Observable(observer => {
            this._mapView.plugin(["AMap.Scale"], () => {
                option = option || new ScalePluginOption();
                let scale = new AMap.Scale({
                    position: option.position || 'LB',
                    offset: option.offset || new AMap.Pixel(5, 5),
                });
                this._mapView.addControl(scale);
                observer.next(scale)
            })
        });
    }

    /**
     * 增加地图工具条组件
     * @param showTraffic
     * @param showRoad
     */
    addToolBarPlugin(option?: ToolBarPluginOption): Observable<any> {
        return new Observable(observer => {
            this._mapView.plugin(["AMap.ToolBar"], () => {
                option = option || new ToolBarPluginOption();
                let toolbar = new AMap.ToolBar({
                    offset: option.offset || new AMap.Pixel(3, 85),
                    position: option.position || 'RB',
                    ruler: option.ruler || true,
                    noIpLocate: option.noIpLocate || false,
                    locate: option.locate || false,
                    liteStyle: option.liteStyle || false,
                    direction: option.direction || true,
                    autoPosition: option.autoPosition || false,
                    locationMarker: option.locationMarker,
                    useNative: option.useNative || true,
                });
                this._mapView.addControl(toolbar);
                observer.next(toolbar)
            })
        });
    }

    /**
     * 增加地图插件
     * @param buttonPosition 
     * @param offset 
     * @param onComplete 
     * @param onError 
     */
    addLocationPlugin(option?: LocationPluginOption): Observable<any> {
        return new Observable(observer => {
            this._mapView.plugin('AMap.Geolocation', () => {
                option = option || new LocationPluginOption();
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: option.enableHighAccuracy || true,
                    timeout: option.timeout || 10000,
                    maximumAge: option.maximumAge || 0,
                    convert: option.convert || true,
                    showButton: option.showButton || true,
                    buttonPosition: option.buttonPosition || 'LB',
                    buttonOffset: option.buttonOffset || new AMap.Pixel(5, 5),
                    showMarker: option.showMarker || true,
                    showCircle: option.showCircle || true,
                    panToLocation: option.panToLocation || true,
                    zoomToAccuracy: option.zoomToAccuracy || true,
                });

                this._mapView.addControl(geolocation);
                observer.next(geolocation)
            });
        });
    }

    /**
     * 切换到影像图层
     */
    switchToImg() {
        this.setLayers([new AMap.TileLayer.Satellite()]);
    }

    /**
     * 切换到普通图层
     */
    switchToVec() {
        this.setLayers([new AMap.TileLayer()]);
    }
    /**
     * 使用该方法后，地图图层会被重置。
     * @param layers  图层数组
     */
    setLayers(layers) {
        this._mapView.setLayers(layers);
    }

    /**
     * 增加覆盖物
     * @param obj 
     */
    add(obj: any) {
        this._mapView.add(obj);
    }

    /**
     * 移除覆盖物
     * @param obj 
     */
    remove(obj: any) {
        this._mapView.remove(obj);
    }

    /**
     * 清除覆盖物
     * @param obj 
     */
    cleanMap() {
        this._mapView.clearMap();
    }

    /**
     * 增加标记物
     * @param position      位置
     * @param clickCallBack 点击回调
     * @param iconUri       图片对象
     * @param content       点标记内容可以是自定义html，显示的情况下，icon属性被覆盖
     */
    getMaker(option: MakerOption, clickCallBack: (e) => void) {
        let marker = new AMap.Marker({
            position: option.position,
            extData: option.extData,
            offset: option.offset || [-20, -62],
            icon: option.icon,
            content: option.content,
            clickable: clickCallBack,
            draggable: option.draggable,
            zIndex: option.zIndex,
            angle: option.angle,
            autoRotation: option.autoRotation,
            label: option.label,
        });

        /*
         *   map.on('click', (ev)=> {
         *       var target = ev.target;// 触发事件的对象
         *       var lnglat = ev.lnglat;// 触发事件的地理坐标，AMap.LngLat 类型
         *       var pixel = ev.pixel;// 触发事件的像素坐标，AMap.Pixel 类型
         *       var type = ev.type; // 触发事件类型
         *   });
         */
        if (clickCallBack) {
            marker.on("click", clickCallBack);
        }

        return marker;
    }

    /**
     * 添加线
     * @param path 
     * @param borderWeight  线条宽度
     * @param strokeColor   线条颜色
     * @param lineJoin      折线拐点连接处样式
     */
    getLine(option: LineOption, clickCallBack: (e) => void) {
        let polyline = new AMap.Polyline({
            path: option.path,
            extData: option.extData,
            borderWeight: option.borderWeight || 2,
            strokeColor: option.strokeColor || '#fff',
            strokeWeight: option.strokeWeight || 2,
            strokeOpacity: option.strokeOpacity || 0.5,
            lineJoin: option.lineJoin || 'round',
            clickable: clickCallBack,
        });

        if (clickCallBack) {
            polyline.on("click", clickCallBack);
        }
        return polyline;
    }


    /**
     * 增加多边形
     * @param path 
     * @param fillColor     填充颜色
     * @param borderWeight  线条宽度
     * @param strokeColor   线条颜色
     */
    getPolygon(option: PolygonOption, clickCallBack?: (e) => void) {
        let polygon = new AMap.Polyline({
            path: option.path,
            extData: option.extData,
            borderWeight: option.borderWeight || 2,
            strokeColor: option.strokeColor || "#fff",
            strokeOpacity: option.strokeOpacity || 0.5,
            strokeWeight: option.strokeWeight || 2,
            fillColor: option.fillColor || "#7a72e5",
            fillOpacity: option.fillOpacity || 0.5,
            zIndex: option.zIndex,
            clickable: clickCallBack,
        });

        if (clickCallBack) {
            polygon.on("click", clickCallBack);
        }
        return polygon;
    }

    /**
     * 添加矢量圆形
     * @param center            圆心位置
     * @param radius            半径
     * @param strokeColor       线颜色
     * @param fillColor         线透明度
     * @param strokeOpacity     填充颜色
     * @param fillOpacity       填充透明度
     * @param strokeWeight      线粗细度
     */
    getCircleMaker(option: CircleMakerOption, clickCallBack?: (e) => void) {
        let circleMarker = new AMap.CircleMarker({
            center: option.center,
            extData: option.extData,
            radius: option.radius || 500,
            strokeColor: option.strokeColor || '#fff',
            strokeOpacity: option.strokeOpacity || 0.5,
            strokeWeight: option.strokeWeight || 2,
            fillColor: option.fillColor || '#7a72e5',
            fillOpacity: option.fillOpacity || 0.5,
            zIndex: option.zIndex,
            clickable: clickCallBack,
        });

        if (clickCallBack) {
            circleMarker.on("click", clickCallBack);
        }
        return circleMarker;
    }

    /**
     * 获取覆盖物群组
     * @param overlay 
     */
    getOverLayGroup(overlay: any[]) {
        return new AMap.OverlayGroup(overlay);
    }

    /**
     * 地图视野发生改变之后回调
     *   map.on('click', (ev)=> {
     *       var target = ev.target;// 触发事件的对象
     *       var lnglat = ev.lnglat;// 触发事件的地理坐标，AMap.LngLat 类型
     *       var pixel = ev.pixel;// 触发事件的像素坐标，AMap.Pixel 类型
     *       var type = ev.type; // 触发事件类型
     *   });
     * @param callback 
     */
    onMapFieldChanged(callback: (e) => void) {
        this._mapView.on('zoomend', callback);
        this._mapView.on('moveend', callback);
    }


    /**
     * 显示窗体
     * @param content   传入 dom 对象，或者 html 字符串    
     * @param isCustom  用自定义窗体
     * @param offset    偏移
     */
    showInfoWindow(content: string | object, isCustom?: boolean, offset?: number[]) {
        let infoWindow = new AMap.InfoWindow({
            isCustom: isCustom || true,
            content: content,
            offset: offset
        });
        infoWindow.open(this._mapView);
        return infoWindow;
    }

    /**
     * 显示带有导航 路径规划等信息的窗体
     * @param option 
     */
    showAdvancedInfoWindow(option: AdvancedInfoWindowOption) {
        return new Observable(observer => {
            this._mapView.plugin('AMap.AdvancedInfoWindow', () => {
                let advancedInfoWindow = new AMap.AdvancedInfoWindow({
                    panel: option.panel || 'panel',
                    placeSearch: option.placeSearch || true,
                    asOrigin: option.asOrigin || true,
                    asDestination: option.asDestination || true,
                    content: option.content
                });

                advancedInfoWindow.open(this._mapView);
                observer.next(advancedInfoWindow);
            });
        });
    }

    /**
     * 其他坐标系转高德坐标,最多支持40对坐标。
     * @param position 
     * @param type 
     */
    transferLnglat(position: number[] | number[][], type?: 'gps|baidu|mapbar') {//支持原始坐标，百度经纬度，图吧经纬度
        return new Observable(observer => {
            AMap.convertFrom(position, type || 'gps', (status, result) => {
                if (status === 'complete' && result.info === 'ok') {
                    observer.next(result.locations);
                } else {
                    observer.error(result.info);
                }
            });
        });
    }
}
