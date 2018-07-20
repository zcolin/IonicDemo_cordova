import { MyApp } from '../../app/app.component';
import { JsBridge } from './jsbridge';
import { JsStartPageReply, JsBaseReply, JsVesionReply, JsUUIDReply, JsLocationReply, JsImagesReply, JsScanQrCode, JsFileReply, JsHttpReply, JsGetStorateReply } from './jsbridge-option';
import { HttpResult } from '../httpservice/http-result';
import { ZErrorReply } from '../httpservice/zerror-reply';
import { ZReply } from '../httpservice/ZReply';
import { ZReplyDefault } from '../httpservice/zreply-default';

export class JsBridgeUtil {
    static jsbridge: JsBridge = new JsBridge();

    /**
     * 注册jsbridge监听
     * @param methodName    注册接口方法名称
     * @param data          传输数据
     * @param callback      被调用后执行回调，可携带参数返回原生端
     *
     * 返回参数：
     * {
     *     "result":true      //true表示网页端拦截（原生不需要处理），false表示网页端未拦截（原生可自己处理）
     *  }
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
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "params":"xxx"          //根据业务制定
     *   }
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
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "params":"xxx"          //根据业务制定
     *   }
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
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *   }
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
     * 原生Toast
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *   }
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
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "uuid":"xxx"            //UUID
     *   }
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
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *   }
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
       * 分享
       * @param responseCallback
       * @param maxNumber         图片最大选择数量
       * @param minPixel          最小像素
       *
       * 返回参数：
       *  {
       *       "cdoe":200,             //成功=200，失败为其他
       *       "msg":"xxx",            //成功可为空，失败填写失败原因
       *   }
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

    /**
     * 扫描二维码
     * @param responseCallback
     *
     * 返回参数：
     *  {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "result":"xxx"          //扫描结果，扫描过程中如果扫描结果未获取到，重新扫描不回调
     *   }
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
     * 获取定位信息
     *
     * 返回参数：{
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "latitude":"xxx",       //参照高德参数
     *       "longitude":"xxx",      //参照高德参数
     *       "province”:"xxx",       //参照高德参数
     *       "city":"xxx",           //参照高德参数
     *       "cityCode":"xxx",       //参照高德参数
     *       "district":"xxx",       //参照高德参数
     *       "adCode":"xxx",         //参照高德参数
     *       "address":"xxx",        //参照高德参数
     *       "road”:"xxx",           //参照高德参数
     *       "street":"xxx",         //参照高德参数
     *       "streetNum":"xxx",      //参照高德参数
     *       "country":"xxx"         //参照高德参数
     *   }
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
     * 选择图片
     * @param responseCallback
     * @param maxNumber         图片最大选择数量
     * @param minPixel          最小像素
     *
     * 返回参数：{
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "images":
     *       [                       //图片集合
     *           {
     *               "name":"xxx",  //文件名称
     *               "data":"xxx",  //base64数据
     *               "path":"xxx"   //在原生端的路径
     *           }
     *       ]
     *   }
     */
    static selectImage(maxNumber?: number, minPixel?: number, responseCallback?: (returnData: JsImagesReply) => void) {
        if (MyApp.ISTELCHINA) {
            let option = { maxNumber: maxNumber, minPixel: minPixel };
            this.jsbridge.callHandler("native_selectImage", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 选择文件
     * @param responseCallback
     * @param type         文件类型， 默认*\/*
     *
     * 返回参数：{
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *        "file":
     *       {
     *           "name":"xxx",      //文件名称
     *           "path":"xxx"       //在原生端的路径
     *        }
     *   }
     */
    static selectFile(type?: string, responseCallback?: (returnData: JsFileReply) => void) {
        if (MyApp.ISTELCHINA) {
            let option = { type: type || "*/*" };
            this.jsbridge.callHandler("native_selectFile", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }


    /**
     * 使用http
     * @param responseCallback
     * @param url                   请求地址
     *
     * 请求参数：{
     *        "method":"post",       //post或者get，默认post
     *        "url":"http://xxxx",   //请求地址
     *        "headers":{            //报文头
     *            "key1":"value1",
     *            "key2":"value2"
     *        },
     *        "params":              //报文体
     *        {
     *           "key1":"value1",
     *           "key2":"value2"
     *        },
     *        "files":{              //上传文件
     *           "fileName1":"path1",
     *           "fileName2":"path2"
     *        }
     *   }
     *
     * 返回参数：
     * {
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx",            //成功可为空，失败填写失败原因
     *       "result":"{"code":200,"message":"xxx","key1":"value1"}"  //服务器返回参数，服务器返回的code和message在params中
     * }
     */
    static http<T>(url: string, httpoption: JsHttpOption, httpResult: HttpResult<T>) {
        if (MyApp.ISTELCHINA) {
            httpoption = httpoption || {};
            httpResult = httpResult || {};
            httpoption.zreply = httpoption.zreply || new ZReplyDefault();
            let option = { url: url, method: httpoption.method || 'post', headers: httpoption.headers || null, params: httpoption.body || null, files: httpoption.files || null };
            this.jsbridge.callHandler("native_http", JSON.stringify(option), (returnData: string) => {
                let reply = JSON.parse(returnData);
                let errorReply = new ZErrorReply();
                let successReply;
                if (reply.code !== 200) {
                    errorReply.code = reply.code;
                    errorReply.msg = reply.message;
                } else if (!reply.result) {
                    errorReply.code = reply.code;
                    errorReply.msg = "返回信息为null";
                } else {
                    let zreply = httpoption.zreply;
                    let result = reply.result;
                    if (zreply.isSuccess(result[zreply.codeKey])) {
                        if (result[zreply.dataKey]) {
                            successReply = result[zreply.dataKey];
                        } else {
                            successReply = result;
                        }
                    }

                    if (!zreply.isSuccess(result[zreply.codeKey]) && (result[zreply.codeKey] || result[zreply.msgKey])) {
                        errorReply.code = result.code;
                        errorReply.msg = result.message;
                    } else {                                    //是json对象，但是不是约定中的数据
                        errorReply.code = 1001;
                        errorReply.msg = "数据不符合规范：\n" + JSON.stringify(result);
                    }
                }

                if (successReply) {
                    httpResult.success(successReply);
                } else {
                    httpResult.error(errorReply);
                }
                httpResult.complete();
            });
        }
    }

    /**
     * 本地存储
     * @param params
     * @param responseCallback
     *
     *  请求参数：{
     *       "key1":"value1",        //key-value
     *       "key2":"value2",        //key-value
     *   }
     *  返回参数：{
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx"            //成功可为空，失败填写失败原因
     *   }
     */
    static putStorage(params: object, responseCallback?: (returnData: JsBaseReply) => void) {
        if (MyApp.ISTELCHINA) {
            let option = params;
            this.jsbridge.callHandler("native_put_storage", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData));
                }
            });
        }
    }

    /**
     * 获取本地存储
     * @param params
     * @param responseCallback
     *
     *  请求参数：{
     *       "key1":"value1",        //key-value
     *       "key2":"value2",        //key-value
     *   }
     *  返回参数：{
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx"             //成功可为空，失败填写失败原因
     *       "result":               //根据key获取的值
     *        {
     *            "key1":"value1",   //key-value
     *            "key2":"value2",   //key-value
     *        }
     *   }
     */
    static getStorage(key: string, responseCallback?: (returnData: string) => void) {
        if (MyApp.ISTELCHINA) {
            let option = { keys: [key] };
            this.jsbridge.callHandler("native_get_storage", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData).result[key]);
                }
            });
        }
    }

    /**
     * 获取本地存储,一次获取多个
     * @param params
     * @param responseCallback
     *
     *  请求参数：{
     *       "key1":"value1",        //key-value
     *       "key2":"value2",        //key-value
     *   }
     *  返回参数：{
     *       "cdoe":200,             //成功=200，失败为其他
     *       "msg":"xxx"             //成功可为空，失败填写失败原因
     *       "result":               //根据key获取的值
     *        {
     *            "key1":"value1",   //key-value
     *            "key2":"value2",   //key-value
     *        }
     *   }
     */
    static getMultiStorage(keys: string[], responseCallback?: (returnData: JsGetStorateReply) => void) {
        if (MyApp.ISTELCHINA) {
            let option = { keys: keys };
            this.jsbridge.callHandler("native_get_storage", JSON.stringify(option), (returnData: string) => {
                if (responseCallback) {
                    responseCallback(JSON.parse(returnData).result);
                }
            });
        }
    }
}


export interface JsHttpOption {
    method?: string;             //请求类型，默认post
    body?: any;                 //请求参数
    headers?: object;           //请求头
    files?: object;             //请求头
    zreply?: ZReply;
}
