/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午1:01
 * ********************************************************
 */

import {MyApp} from "../../app/app.component";
import {JsBridgeUtil} from "../jsbridge/jsbridge.util";
import {NavController, NavOptions} from "ionic-angular";
import {Page} from "ionic-angular/navigation/nav-util";
import {JsStartPageReply} from "../jsbridge/jsbridge-option";

/**
 * 页面相关的工具类
 */
export class PageUtil {

    /**
     * 调用NavController的push方法将页面压入栈内
     * @param navCtrl
     * @param page              页面名称或实例
     * @param params            参数
     * @param opts
     */
    static push(navCtrl: NavController, page: Page | string, params?: any, opts?: NavOptions) {
        navCtrl.push(page, params, opts);
    }

    /**
     * 启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param navCtrl
     * @param pageName          页面名称
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startPage(navCtrl: NavController, pageName: string, title?: string, params?: any, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (MyApp.ISTELCHINA) {
            JsBridgeUtil.startPage(pageName, title, params, responseCallback);
        } else {
            navCtrl.push(pageName, params);
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
        if (MyApp.ISTELCHINA) {
            JsBridgeUtil.startWebPage(url, title, responseCallback);
        } else {
            navCtrl.push('ExternalWebPage', {'url': url, 'title': title});
        }
    }
}

