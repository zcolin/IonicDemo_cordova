export class ScalePluginOption {
    position?: string | object;         //控制显示位置
    offset?;                            //相对于地图容器左上角的偏移量，正数代表向右下偏移。Pixel(10, 20)
}

export class ControlBarPluginOption {
    position?: string | object;         //控制显示位置
    showZoomBar?: boolean;              //是否显示缩放按钮.移动端默认为false，PC端为默认为true
    showControlButton?: boolean;        //是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true
}

export class MapTypePluginOption {
    defaultType?: number;               //初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
    showTraffic?: boolean;              //叠加实时交通图层 默认值：false
    showRoad?: boolean;                 //叠加路网图层 默认值：false
}

export class ToolBarPluginOption {
    offset?;                            //相对于地图容器左上角的偏移量，正数代表向右下偏移。Pixel(10, 20)
    position?: string | object;         //控件停靠位置
    ruler?: boolean;                    //标尺键盘是否可见，默认为true
    noIpLocate?: boolean;               //定位失败后，是否开启IP定位，默认为false
    locate?: boolean;                   //是否显示定位按钮，默认为false
    liteStyle?: boolean;                //是否使用精简模式，默认为false
    direction?: boolean;                //方向键盘是否可见，默认为true
    autoPosition?: boolean;             //是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效，默认为false
    locationMarker?;                    //自定义定位图标，值为Marker对象
    useNative?: boolean;                //是否使用高德定位sdk用来辅助优化定位效果，默认：false.
}

export class LocationPluginOption {
    enableHighAccuracy?: boolean;       //是否使用高精度定位，默认:true
    timeout?: number;                   //超过10秒后停止定位，默认：无穷大
    maximumAge?: number;                //定位结果缓存0毫秒，默认：0
    convert?: boolean;                  //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    showButton?: boolean;               //显示定位按钮，默认：true
    buttonPosition?: string | object;   //定位按钮停靠位置，默认：'LB'，左下角
    buttonOffset?: ;                    //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    showMarker?: boolean;               //定位成功后在定位到的位置显示点标记，默认：true
    showCircle?: boolean;               //定位成功后用圆圈表示定位精度范围，默认：true
    panToLocation?: boolean;            //定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy?: boolean;           //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
}

export class MakerOption {
    position: number[];
    extData?: any;                           //用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    offset?;                                 //移动多少像素使锚点对准position,默认值为Pixel(-10,-34)
    icon?: string | object;                  //需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
    content?: string | object;               //点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
    draggable?: boolean;                     //设置点标记是否可拖拽移动，默认为false
    zIndex?: number;                        //点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
    angle?: number;                          //点标记的旋转角度，广泛用于改变车辆行驶方向
    autoRotation?: boolean;                  //是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。广泛用于自动调节车辆行驶方向。
    label?: { content, offset };	            //添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0, 0）
}

export class LineOption {
    path: number[][];
    extData?: any;                           //用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    borderWeight?: number;
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    lineJoin?: string;
}

export class PolygonOption {
    path: number[][];
    extData?: any;                           //用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    borderWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    zIndex?: number;
}

export class CircleMakerOption {
    center: number[];
    extData?: any;                           //用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    radius?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    zIndex?: number;
}

export class AdvancedInfoWindowOption {
    panel?: string = 'panel';            //如果设置了 panel 属性，路线规划和 poi 搜索的结果可以显示在 panel 指定的 div 中
    placeSearch?: boolean;        //周边搜索
    asOrigin?: boolean;           //我的位置
    asDestination?: boolean;      //我要去
    content?: string;                    //显示内容
}

export class SearchNearOption {
    city?: string;                   //城市名（中文或中文全拼）、citycode、adcode 默认值：“全国”
    citylimit?: boolean;     //是否强制限制城市
    type?: string;                   //兴趣点类别，多个类别用“|”分割，如“餐饮|酒店|电影院”
    pageSize?: number;          //单页显示结果条数，默认10, 取值范围：1-50，超出取值范围按最大值返回
    extensions?: string;    //此项默认值：base，返回基本地址信息取值：all，返回基本+详细信息
    pageIndex?: number;          //页码
    panel?: string;
    atuoFitView?: boolean;    //用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围
    map;
}