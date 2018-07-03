import { MyApp } from "../../app/app.component";
import { JsBridgeUtil } from "./jsbridge.util";
import { NavController } from 'ionic-angular';

/**
 * 页面相关的工具类
 */
export class PageUtil {
    /**
     * 启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param navCtrl
     * @param pageName          页面名称
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startPage(navCtrl: NavController, pageName: string, title?: string, params?: any, responseCallback?: (returnData: string) => void) {
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
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startWebPage(navCtrl: NavController, url: string, title?: string, responseCallback?: (returnData: string) => void) {
        if (MyApp.ISTELCHINA) {
            JsBridgeUtil.startWebPage(url, title, responseCallback);
        } else {
            navCtrl.push('ExternalWebPage', { 'url': url, 'title': title });
        }
    }
}

