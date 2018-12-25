import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';

/**
 * 浏览器相关工具类
 */
@Injectable()
export class BrowserUtil {

    /**
     * 是否自有环境
     */
    static isTelchina() {
        return /telchina:/.test(navigator.userAgent);
    }

    /**
     * 是否真机环境
     * @return {boolean}
     */
    static isMobile(platform: Platform): boolean {
        return platform.is('mobile');
    }

    /**
     * 是否android真机环境
     * @return {boolean}
     */
    static isAndroid(platform: Platform): boolean {
        return this.isMobile(platform) && platform.is('android');
    }

    /**
     * 是否ios真机环境
     * @return {boolean}
     */
    static isIos(platform: Platform): boolean {
        return this.isMobile(platform) && (platform.is('ios') || platform.is('ipad') || platform.is('iphone'));
    }

    /**
     * 是否IphoneX
     * @returns {boolean}
     */
    static isIphoneX(): boolean {
        return /iPhone X/.test(navigator.userAgent);
    }

    /**
     * 获取设备高度
     * @returns {number}
     */
    public static getWindowHeight(): number {
        return window.screen.height;
    }

    /**
     * 获取设备宽度
     * @returns {number}
     */
    public static getWindowWidth(): number {
        return window.screen.width;
    }

    /**
     * 获取设备屏幕分辨率
     * @returns {[number,number]}
     */
    static getResolution(): [number, number] {
        const x = window.screen.width * window.devicePixelRatio;
        const y = window.screen.height * window.devicePixelRatio;
        return [x, y];
    }
}
