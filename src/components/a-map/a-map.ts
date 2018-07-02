import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlBarPluginOption, MapTypePluginOption, ToolBarPluginOption, LocationPluginOption, MakerOption, LineOption, AdvancedInfoWindowOption, SearchNearOption, PolygonOption, ScalePluginOption, IconOption, CircleOption } from './a-map.option';

@Component({
    selector: 'a-map',
    templateUrl: 'a-map.html'
})
export class AMapComponent {
    private _mapView;

    @ViewChild('panel') panel: ElementRef
    constructor() {

    }

    ngAfterContentInit() {
        this.loadMap();
    }

    loadMap() {
        this._mapView = new AMap.Map('amap-container', {
            resizeEnable: true,
        });
    }

    getMap() {
        return this._mapView;
    }

    setZoom(zoom: number) {
        this._mapView.setZoom(zoom);
    }

    setCity(cityName: string) {
        this._mapView.setCity(cityName);
    }

    setCenter(center: number[]) {
        this._mapView.setCenter(center);
    }

    setZoomAndCenter(zoom: number, center: number[]) {
        this._mapView.setZoomAndCenter(zoom, center);
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
     * 
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
     * 
     * @param option 
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
     * 
     * @param option       
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
     * 
     * @param option
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
     * 
     * @param option
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
                    direction: option.direction || false,
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
     * 增加定位插件
     * 
     * @param option 
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
     * 
     * @param layers  图层数组
     */
    setLayers(layers) {
        this._mapView.setLayers(layers);
    }

    /**
     * 增加覆盖物
     * 
     * @param obj 
     */
    add(obj: any) {
        this._mapView.add(obj);
    }

    /**
     * 移除覆盖物
     * 
     * @param obj 
     */
    remove(obj: any) {
        this._mapView.remove(obj);
    }

    /**
     * 清除覆盖物
     * 
     * @param obj 
     */
    cleanMap() {
        this._mapView.clearMap();
    }

    /**
     * 增加标记物
     * 
     * @param option      
     * @param clickCallBack 点击回调
     */
    getMaker(option: MakerOption, clickCallBack?: (e) => void) {
        let icon = option.icon && option.icon instanceof IconOption ? new AMap.Icon({
            size: option.icon.size,
            imageOffset: option.icon.imageOffset,
            image: option.icon.image,
            imageSize: option.icon.imageSize,
        }) : option.icon;
        let marker = new AMap.Marker({
            position: option.position,
            extData: option.extData,
            offset: option.offset || new AMap.Pixel(-20, -62),
            icon: icon,
            content: option.content,
            clickable: clickCallBack ? true : false,
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
    * 添加单个点
    * @param option 
    * @param clickCallBack 
    */
    addMaker(option: MakerOption, clickCallBack?: (e) => void) {
        this.add(this.getMaker(option, clickCallBack))
    }

    /**
     * 获取线实例
     * 
     * @param option      
     * @param clickCallBack 点击回调
     */
    getLine(option: LineOption, clickCallBack?: (e) => void) {
        let polyline = new AMap.Polyline({
            path: option.path,
            extData: option.extData,
            isOutline: option.isOutline,
            borderWeight: option.borderWeight || 1,
            outlineColor: option.outlineColor || '#fff',
            strokeColor: option.strokeColor || '#4875c1',
            strokeWeight: option.strokeWeight || 5,
            strokeOpacity: option.strokeOpacity || 0.5,
            strokeStyle: option.strokeStyle,
            strokeDasharray: option.strokeDasharray,
            lineJoin: option.lineJoin || 'round',
            lineCap: option.lineCap,
            draggable: option.draggable,
            clickable: clickCallBack ? true : false,
        });

        if (clickCallBack) {
            polyline.on("click", clickCallBack);
        }
        return polyline;
    }

    /**
     * 添加线
     * @param option 
     * @param clickCallBack 
     */
    addLine(option: LineOption, clickCallBack?: (e) => void) {
        this.add(this.getLine(option, clickCallBack))
    }

    /**
     * 获取多边形实例
     * 
     * @param option      
     * @param clickCallBack 点击回调
     */
    getPolygon(option: PolygonOption, clickCallBack?: (e) => void) {
        let polygon = new AMap.Polygon({
            path: option.path,
            zIndex: option.zIndex,
            strokeWeight: option.strokeWeight || 2,
            strokeColor: option.strokeColor || "#fff",
            strokeOpacity: option.strokeOpacity || 0.5,
            strokeStyle: option.strokeStyle,
            extData: option.extData,
            strokeDasharray: option.strokeDasharray,
            fillColor: option.fillColor || "#7a72e5",
            fillOpacity: option.fillOpacity || 0.5,
            draggable: option.draggable,
            clickable: clickCallBack ? true : false,
        });

        if (clickCallBack) {
            polygon.on("click", clickCallBack);
        }
        return polygon;
    }

    /**
     * 添加多边形
     * @param option 
     * @param clickCallBack 
     */
    addPolygon(option: PolygonOption, clickCallBack?: (e) => void) {
        this.add(this.getPolygon(option, clickCallBack))
    }

    /**
     * 获取矢量圆形实例
     * 
     * @param option      
     * @param clickCallBack 点击回调
     */
    getCircle(option: CircleOption, clickCallBack?: (e) => void) {
        let circle = new AMap.Circle({
            center: option.center,
            zIndex: option.zIndex,
            extData: option.extData,
            radius: option.radius || 500,
            strokeColor: option.strokeColor || '#fff',
            strokeWeight: option.strokeWeight || 2,
            strokeOpacity: option.strokeOpacity || 0.5,
            strokeStyle: option.strokeStyle,
            strokeDasharray: option.strokeDasharray,
            fillColor: option.fillColor || '#f7ae9e',
            fillOpacity: option.fillOpacity || 0.5,
            clickable: clickCallBack ? true : false,
        });

        if (clickCallBack) {
            circle.on("click", clickCallBack);
        }
        return circle;
    }

    /**
     * 添加矢量圆形实例
     * @param option 
     * @param clickCallBack 
     */
    addCircle(option: CircleOption, clickCallBack?: (e) => void) {
        this.add(this.getCircle(option, clickCallBack))
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
     * @param clickCallBack 点击回调
     */
    onMapFieldChanged(callback: (e) => void) {
        this._mapView.on('zoomend', callback);
        this._mapView.on('moveend', callback);
    }


    /**
     * 显示窗体
     * 
     * @param content   传入 dom 对象，或者 html 字符串    
     * @param isCustom  用自定义窗体
     * @param offset    偏移 AMap.Pixel
     */
    showInfoWindow(content: string | object, isCustom?: boolean, offset?) {
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
     * 
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
     * 
     * @param position 
     * @param type 
     */
    convertFrom(position: number[] | number[][], type?: 'gps' | 'baidu' | 'mapbar') {//支持原始坐标，百度经纬度，图吧经纬度
        return new Observable(observer => {
            if (position.length <= 40) {
                AMap.convertFrom(position, type || 'gps', (status, result) => {
                    if (status === 'complete' && result.info === 'ok') {
                        observer.next(result.locations);
                    } else {
                        console.log(result.info)
                    }
                });
            } else {
                let resultList: number[][] = [];
                let pos = position as number[][];
                this.covert(resultList, pos, 0, type, () => {
                    observer.next(resultList);
                });
            }
        });
    }

    /**
     * 官方方法一次最多转换40个，在此递归调用
     * 
     * @param resultList        盛放转换结果的列表
     * @param positionList      需要转换的列表
     * @param index             当前转换的偏移
     * @param type                  
     * @param callback 
     */
    private covert(resultList: number[][], positionList: number[][], index: number, type: 'gps' | 'baidu' | 'mapbar', callback: () => void) {
        let size = positionList.length - index > 40 ? 40 : positionList.length - index;
        if (size > 0) {
            let array = positionList.slice(index, index + size);
            AMap.convertFrom(array, type || 'gps', (status, result) => {
                if (status === 'complete' && result.info === 'ok') {
                    resultList.push(result.locations)
                    this.covert(resultList, positionList, index + array.length, type, callback);
                } else {
                    console.log(result.info)
                }
            });
        } else {
            callback();
        }
    }
}
