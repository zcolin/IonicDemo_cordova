import { Injectable } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { JsBridge } from './jsbridge';
import { JsStartPageReply, JsBaseReply, JsVesionReply, JsUUIDReply, JsLocationReply, JsImagesReply, JsScanQrCode } from './jsbridge-option';

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
            this.jsbridge.registerHandler("js_goBack", callback);
        }
    }

    /**
     * 启动新页面，在手机浏览器会使用原生调用启动新页面
     * @param pageName          页面名称
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startPage(pageName: string, title?: string, params?: any, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (MyApp.ISTELCHINA) {
            let strTitle = title || null;
            params = params ? encodeURIComponent(JSON.stringify(params)) : params;
            let strParam = params ? JSON.stringify({ pageName: pageName, title: strTitle, params: params }) : JSON.stringify({ pageName: pageName, title: strTitle, params: null });
            this.jsbridge.callHandler("native_startPage", strParam, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }


    /**
     * 使用原生webview打开网页
     * @param url               网址
     * @param title             页面名称，如果不传，则不显示原生标题
     * @param params            参数
     * @param responseCallback  关闭页面回调
     */
    static startWebPage(url: string, title?: string, responseCallback?: (returnData: JsStartPageReply) => void) {
        if (MyApp.ISTELCHINA) {
            let strTitle = title || null;
            let strParam = JSON.stringify({ url: url, title: strTitle });
            this.jsbridge.callHandler("native_startWebPage", strParam, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 关闭当前webveiw
     * @param responseCallback 
     */
    static finishPage(responseCallback?: (returnData: JsBaseReply) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("native_finishPage", null, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 重新登录
     * @param responseCallback
     */
    static reLogin(responseCallback?: (returnData: JsBaseReply) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("native_reLogin", null, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 原生Toast
     */
    static toast(message: String, duration?: number, responseCallback?: (returnData: JsBaseReply) => void) {
        if (MyApp.ISTELCHINA) {
            duration = duration || 2000;
            this.jsbridge.callHandler("native_toast", JSON.stringify({ message: message, duration: duration }), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 获取客户端版本号
     */
    static getVersion(responseCallback: (returnData: JsVesionReply) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("native_appVersion", null, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 获取UUID
     */
    static getUUID(responseCallback: (returnData: JsUUIDReply) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("native_uuid", null, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 获取定位信息
     */
    static getLocation(responseCallback: (returnData: JsLocationReply) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("native_location", null, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 扫描二维码
     * @param responseCallback  
     */
    static scanQrCode(responseCallback?: (returnData: JsScanQrCode) => void) {
        if (MyApp.ISTELCHINA) {
            this.jsbridge.callHandler("native_scanQrCode", null, (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 选择图片
     * @param responseCallback  
     * @param mxaNumber         图片最大选择数量
     * @param minPixel          最小像素
     */
    static selectImage(mxaNumber?: number, minPixel?: number, responseCallback?: (returnData: JsImagesReply) => void) {
        if (MyApp.ISTELCHINA) {
            let option = { mxaNumber: mxaNumber, minPixel: minPixel };
            this.jsbridge.callHandler("native_selectImage", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 分享
     * @param responseCallback  
     * @param mxaNumber         图片最大选择数量
     * @param minPixel          最小像素
     */
    static share(title: string, content?: string, targetUrl?: string, imageUrl?: string, responseCallback?: (returnData: JsBaseReply) => void) {
        if (MyApp.ISTELCHINA) {
            let option = { title: title, content: content, targetUrl: targetUrl, imageUrl: imageUrl };
            this.jsbridge.callHandler("native_share", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }
}
