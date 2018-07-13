import { Injectable } from '@angular/core';
import { MyApp } from '../../app/app.component';

/**
 * js通讯基类
 */
export class JsBaseReply {
    code: string;
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
export class JsVesionReply extends JsBaseReply {
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
    images: string[];
}

/**
 * 扫描二维码返回信息
 */
export class JsScanQrCode extends JsBaseReply {
    result: string;
}