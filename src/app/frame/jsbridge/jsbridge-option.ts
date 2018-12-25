/**
 * js通讯基类
 */
export class JsBaseReply {
    code: number;
    msg?: string;
}
/**
 * 启动新页面返回信息
 */
export class JsStartPageReply extends JsBaseReply {
    params?: string;
}
/**
 * 获取版本号返回信息
 */
export class JsVersionReply extends JsBaseReply {
    versionName?: string;
    versionCode?: string;
}
/**
 * 获取UUID返回信息
 */
export class JsUUIDReply extends JsBaseReply {
    uuid: string;
}

/**
 * 获取定位返回信息
 */
export class JsLocationReply extends JsBaseReply {
    latitude?: number;
    longitude?: number;
    province?: string;
    city?: string;
    cityCode?: string;
    district?: string;
    adCode?: string;
    address?: string;
    road?: string;
    street?: string;
    streetNum?: string;
    country?: string;
}

/**
 * 选择图片返回信息
 */
export class JsImagesReply extends JsBaseReply {
    images: ImageData[];
}

/**
 * 图片信息
 */
export class ImageData {
    name: string;
    data: string;
    path: string;
}

/**
 * 扫描二维码返回信息
 */
export class JsScanQrCode extends JsBaseReply {
    result: string;
}

/**
 * 选择文件返回信息
 */
export class JsFileReply extends JsBaseReply {
    file: FileData;
}

/**
 * 文件信息
 */
export class FileData {
    name: string;
    path: string;
}
/**
 * http返回信息
 */
export class JsHttpReply extends JsBaseReply {
    result: object;
}


/**
 * 获取store返回信息
 */
export class JsGetStorateReply extends JsBaseReply {
    result: object;
}
