/**
 * 页面相关的工具类
 */
import {JsStartPageReply} from '../jsbridge/jsbridge-option';
import {JsBridgeUtil} from '../jsbridge/jsbridge.util';
import {BrowserUtil} from './browser.util';
import {NavigationExtras, Router, UrlTree} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {ExternalWebViewPage} from '../components/external-web-view/external-web-view.page';

export class PageUtil {

    /**
     * 导航到页面
     * @param {Router} router
     * @param {string | UrlTree | any[]} url
     * @param {NavigationExtras} extras
     * @returns {Promise<boolean>}
     */
    static navigate(router: Router, url: string | UrlTree | any[], extras?: NavigationExtras) {
        if (Array.isArray(url)) {
            return router.navigate(url, extras);
        } else {
            return router.navigateByUrl(url, extras);
        }
    }

    /**
     * 启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param router
     * @param url
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startNativePage(router: Router, url: string, title?: string, params?: any, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (BrowserUtil.isTelchina()) {
            JsBridgeUtil.startPage(url, title, params, responseCallback);
        } else {
            // 如果没有使用本地应用加载，ionic的页面
            router.navigateByUrl(url, {queryParams: params});
        }
    }

    /**
     * 使用启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param modalCtrl
     * @param url               网页地址
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param responseCallback  关闭页面回调
     */
    static async startWebPage(modalCtrl: ModalController, url: string, title?: string, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (BrowserUtil.isTelchina()) {
            JsBridgeUtil.startWebPage(url, title, responseCallback);
        } else {
            let modal;
            const modalOption = {
                component: ExternalWebViewPage,
                componentProps: {
                    url: url,
                    title: title,
                    finishCallback: () => {
                        modal.dismiss();
                    }
                }
            };
            modal = await modalCtrl.create(modalOption);
            await modal.present();
        }
    }
}
