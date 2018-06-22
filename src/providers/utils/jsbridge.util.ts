import { Injectable } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { JsBridge } from '../jsbridge/jsbridge';

@Injectable()
export class JsBridgeUtil {
    static jsbridge: JsBridge = new JsBridge();

    /**
     * 注册jsbridge监听
     * @param methodName    注册接口方法名称
     * @param data          传输数据
     * @param callback      被调用后执行回调，可携带参数返回原生端
     */
    static registerGoBack(callback: (data: string, responseCallback: (returnData: string) => void) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.registerHandler("goBack", callback);
        }
    }

    /**
     * 启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param pageName          页面名称
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startNewPage(pageName: string, title?: string, params?: any, responseCallback?: (returnData: string) => void) {
        if (MyApp.ISTELCHINA) {
            let strTitle = title || null;
            params = params ? encodeURIComponent(JSON.stringify(params)) : params;
            let strParam = params ? JSON.stringify({ pageName: pageName, title: strTitle, params: params }) : JSON.stringify({ pageName: pageName, title: strTitle, params: null });
            this.jsbridge.callHandler("startNewPage", strParam, responseCallback);
        }
    }

    
    /**
     * 打开网页
     * @param pageName          页面名称
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startWebPage(url: string, title?: string, params?: any, responseCallback?: (returnData: string) => void) {
        if (MyApp.ISTELCHINA) {
            let strTitle = title || null;
            params = params ? encodeURIComponent(JSON.stringify(params)) : params;
            let strParam = params ? JSON.stringify({ url: url, title: strTitle, params: params }) : JSON.stringify({ url: url, title: strTitle, params: null });
            this.jsbridge.callHandler("startWebPage", strParam, responseCallback);
        }
    }

    /**
     * 重新登录
     * @param responseCallback
     */
    static reLogin(responseCallback?: (returnData: string) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("reLogin", null, responseCallback);
        }
    }

    /**
     * 原生Toast
     */
    static toast(message: String, duration?: number) {
        if (MyApp.ISTELCHINA) {
            duration = duration || 2000;
            this.jsbridge.callHandler("toast", JSON.stringify({ message: message, duration: duration }), null);
        }
    }
}
