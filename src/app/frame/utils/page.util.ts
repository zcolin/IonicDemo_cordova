/**
 * 页面相关的工具类
 */
import {NavController} from '@ionic/angular';
import {JsStartPageReply} from '../jsbridge/jsbridge-option';
import {JsBridgeUtil} from '../jsbridge/jsbridge.util';
import {BrowserUtil} from './browser.util';

export class PageUtil {

    /**
     * 启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param navCtrl
     * @param url
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startPage(navCtrl: NavController, url: string, title?: string, params?: any, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (BrowserUtil.isTelchina()) {
            JsBridgeUtil.startPage(url, title, params, responseCallback);
        } else {
            navCtrl.navigateForward(url, true, {queryParams: params});
        }
    }

    /**
     * 使用启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param navCtrl
     * @param url               网页地址
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param responseCallback  关闭页面回调
     */
    static startWebPage(navCtrl: NavController, url: string, title?: string, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (BrowserUtil.isTelchina()) {
            JsBridgeUtil.startWebPage(url, title, responseCallback);
        } else {
            navCtrl.navigateForward('ExternalWebPage', true, {queryParams: {'url': url, 'title': title}});
        }
    }
}
