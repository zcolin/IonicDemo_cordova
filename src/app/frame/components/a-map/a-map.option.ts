export class ScalePluginOption {
    position?: string | object;         // 控制显示位置
    offset?;                            // 相对于地图容器左上角的偏移量，正数代表向右下偏移。AMap.Pixel(10, 20)
}

export class ControlBarPluginOption {
    position?: string | object;         // 控制显示位置
    showZoomBar?: boolean;              // 是否显示缩放按钮.移动端默认为false，PC端为默认为true
    showControlButton?: boolean;        // 是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true
}

export class MapTypePluginOption {
    defaultType?: number;               // 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
    showTraffic?: boolean;              // 叠加实时交通图层 默认值：false
    showRoad?: boolean;                 // 叠加路网图层 默认值：false
}

export class ToolBarPluginOption {
    offset?;                            // 相对于地图容器左上角的偏移量，正数代表向右下偏移。AMap.Pixel(10, 20)
    position?: string | object;         // 控件停靠位置
    ruler?: boolean;                    // 标尺键盘是否可见，默认为true
    noIpLocate?: boolean;               // 定位失败后，是否开启IP定位，默认为false
    locate?: boolean;                   // 是否显示定位按钮，默认为false
    liteStyle?: boolean;                // 是否使用精简模式，默认为false
    direction?: boolean;                // 方向键盘是否可见，默认为true
    autoPosition?: boolean;             // 是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效，默认为false
    locationMarker?;                    // 自定义定位图标，值为Marker对象
    useNative?: boolean;                // 是否使用高德定位sdk用来辅助优化定位效果，默认：false.
}

export class LocationPluginOption {
    enableHighAccuracy?: boolean;       // 是否使用高精度定位，默认:true
    timeout?: number;                   // 超过10秒后停止定位，默认：无穷大
    maximumAge?: number;                // 定位结果缓存0毫秒，默认：0
    convert?: boolean;                  // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    showButton?: boolean;               // 显示定位按钮，默认：true
    buttonPosition?: string | object;   // 定位按钮停靠位置，默认：'LB'，左下角
    buttonOffset?;                      // 定位按钮与设置的停靠位置的偏移量，默认：AMap.Pixel(10, 20)
    showMarker?: boolean;               // 定位成功后在定位到的位置显示点标记，默认：true
    showCircle?: boolean;               // 定位成功后用圆圈表示定位精度范围，默认：true
    panToLocation?: boolean;            // 定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy?: boolean;           // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
}

export class MakerOption {
    position: number[];
    extData?: any;                      // 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    offset?;                            // 移动多少像素使锚点对准position,默认值为AMap.Pixel(-10,-34)
    icon?: string | object;             // 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
    content?: string | object;          // 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
    draggable?: boolean;                // 设置点标记是否可拖拽移动，默认为false
    zIndex?: number;                    // 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
    angle?: number;                     // 点标记的旋转角度，广泛用于改变车辆行驶方向
    autoRotation?: boolean;             // 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。广泛用于自动调节车辆行驶方向。
    label?: { content, offset };	    // 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0, 0） AMap.Pixel
}

export class LabelOption {
    content?: string | object;          // 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。
    offset?;                            // AMap.Pixel, 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0）
}

export class LineOption {
    path: number[][];
    zIndex?: number;                     // 折线覆盖物的叠加顺序
    extData?: any;                      // 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    isOutline?: false;                  // 是否带描边
    borderWeight?: number;              // 描边宽度
    outlineColor?: string;              // 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
    strokeColor?: string;               // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    strokeWeight?: number;              // 线条宽度，单位：像素
    strokeOpacity?: number;             // 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    strokeStyle?: string;               // 线样式，实线:solid，虚线:dashed
    strokeDasharray?: number[];         // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
    lineJoin?: string;                  // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
    lineCap?: string;                   // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
    draggable?: boolean;                // 设置折线是否可拖拽移动，默认为false
}

export class PolygonOption {
    path: number[][];
    zIndex?: number;                     // 折线覆盖物的叠加顺序
    extData?: any;                      // 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    strokeColor?: string;               // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    strokeWeight?: number;              // 线条宽度，单位：像素
    strokeOpacity?: number;             // 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    strokeStyle?: string;               // 线样式，实线:solid，虚线:dashed
    strokeDasharray?: number[];         // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
    fillColor?: string;                 // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
    fillOpacity?: number;               // 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    draggable?: boolean;                // 设置折线是否可拖拽移动，默认为false
}

export class CircleOption {
    center: number[];                   // 圆心位置
    zIndex?: number;                     // 折线覆盖物的叠加顺序
    extData?: any;                      // 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    radius?: number;                    // 圆半径，单位:米
    strokeColor?: string;               // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    strokeWeight?: number;              // 线条宽度，单位：像素
    strokeOpacity?: number;             // 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    strokeStyle?: string;               // 线样式，实线:solid，虚线:dashed
    strokeDasharray?: number[];         // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
    fillColor?: string;                 // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
    fillOpacity?: number;               // 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
}

export class AdvancedInfoWindowOption {
    panel = 'panel';                // 如果设置了 panel 属性，路线规划和 poi 搜索的结果可以显示在 panel 指定的 div 中
    placeSearch?: boolean;          // 周边搜索
    asOrigin?: boolean;             // 我的位置
    asDestination?: boolean;        // 我要去
    content?: string;               // 显示内容
}

export class SearchNearOption {
    city?: string;                  // 城市名（中文或中文全拼）、citycode、adcode 默认值：“全国”
    citylimit?: boolean;            // 是否强制限制城市
    type?: string;                  // 兴趣点类别，多个类别用“|”分割，如“餐饮|酒店|电影院”
    pageSize?: number;              // 单页显示结果条数，默认10, 取值范围：1-50，超出取值范围按最大值返回
    extensions?: string;            // 此项默认值：base，返回基本地址信息取值：all，返回基本+详细信息
    pageIndex?: number;             // 页码
    panel?: string;
    atuoFitView?: boolean;          // 用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围
    map;
}

export class IconOption {
    size?: string;                  // 图标尺寸，默认值(36,36)
    imageOffset?: boolean;          // 图标取图偏移量。当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围
    image?: string;                 // 图标的取图地址。默认为蓝色图钉图片
    imageSize?: number;             // 图标所用图片大小，根据所设置的大小拉伸或压缩图片，等同于CSS中的background-size属性。可用于实现高清屏的高清效果
}
