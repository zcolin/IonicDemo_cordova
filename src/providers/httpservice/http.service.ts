/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:53
 * ********************************************************
 */

import {ZReply} from "./ZReply";
import {ZErrorReply} from "./zerror-reply";
import {HttpResult} from "./http-result";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import {Observable, Subscription, TimeoutError} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import {App, Loading, NavController} from "ionic-angular";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {ZHttpOption} from './zhttp-option';
import {ZHttpError} from './zhttp-error';
import {UiService} from "../ui.service";
import {Util} from "../utils/util";
import {ZReplyDefault} from "./zreply-default";
import {ZHttpMultiRequestOption} from "./zhttp-multi-request-option";
import {LogUtil} from "../utils/log.util";

/**
 * http 服务类
 */
@Injectable()
export class HttpService {
    constructor(private http: HttpClient, private uiService: UiService, public appCtrl: App) {
    }

    /**
     * get请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url                   请求地址
     * @param zOption               请求参数 {@link ZHttpError}
     * @param result                回调接口 {@link HttpResult}
     */
    public get<T>(url: string, zOption: ZHttpOption<T>, result: HttpResult<T>): Subscription {
        zOption = zOption || {};
        zOption.type = 'get';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.request(zOption);
    }

    /**
     * post请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url                   请求地址
     * @param zOption               请求参数 {@link ZHttpError}
     * @param result                回调接口 {@link HttpResult}
     */
    public post<T>(url: string, zOption: ZHttpOption<T>, result: HttpResult<T>): Subscription {
        zOption = zOption || {};
        zOption.type = 'post';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.request(zOption);
    }

    /**
     * 同时发起多个Get请求， 按自定义回调方法进行回调，回调顺序按发起顺序。有一个接口失败，则所有请求失败。
     * @param {ZHttpMultiRequestOption[]} requestMulti
     * @returns {Subscription}
     */
    public getMultiRequest(requestMulti: ZHttpMultiRequestOption): Subscription {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach(value => value.type = 'get');
        }
        return this.requestMulti(requestMulti);
    }

    /**
     * 同时发起多个Post请求， 已按自定义回调方法进行回调，回调数据未数组，回调顺序按发起顺序
     * @param {ZHttpMultiRequestOption} requestMulti
     * @returns {Subscription}
     */
    public postMultiRequest(requestMulti: ZHttpMultiRequestOption): Subscription {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach(value => value.type = 'post');
        }
        return this.requestMulti(requestMulti);
    }

    /**
     * 同时发起多个网络请求， 已按自定义回调方法进行回调，回调顺序按发起顺序。有一个接口失败，则所有请求失败。
     * @param {ZHttpMultiRequestOption[]} multiRequestOption
     * @returns {Subscription}
     */
    public requestMulti(multiRequestOption: ZHttpMultiRequestOption): Subscription {
        let obArray: Observable<any>[] = [];
        let loading = multiRequestOption.isHideLoading ? null : this.uiService.showLoading(multiRequestOption.loadingMsg);
        if (multiRequestOption.option && multiRequestOption.option.length > 0) {
            for (let request of multiRequestOption.option) {
                request.result = request.result || {};
                obArray.push(this.requestObservable(request));
            }
        }

        return Observable.forkJoin(...obArray)
                         .subscribe(
                             (obj) => {
                                 if (loading) {
                                     loading.dismiss();
                                 }
                                 for (let i = 0; i < obj.length; i++) {
                                     let item = obj[i];
                                     if (multiRequestOption.option[i].result.success) {
                                         multiRequestOption.option[i].result.success(item);
                                     }
                                     if (multiRequestOption.option[i].result.complete) {
                                         multiRequestOption.option[i].result.complete();
                                     }
                                 }
                             },
                             (error) => {
                                 if (loading) {
                                     loading.dismiss();
                                 }
                                 for (let i = 0; i < multiRequestOption.option.length; i++) {
                                     if (multiRequestOption.option[i].result.error) {
                                         multiRequestOption.option[i].result.error(error);
                                     }
                                     if (multiRequestOption.option[i].result.complete) {
                                         multiRequestOption.option[i].result.complete();
                                     }
                                 }
                             });
    }

    /**
     * 网络请求， 按自定义回调方法进行回调
     * @param {ZHttpOption} zOption
     * @returns {Subscription}
     */
    public request<T>(zOption: ZHttpOption<T>): Subscription {
        zOption.result = zOption.result || {};
        let loading = zOption.isHideLoading ? null : this.uiService.showLoading(zOption.loadingMsg);
        return this.requestObservable<T>(zOption)
                   .subscribe(HttpService.successResult(zOption.result, loading), HttpService.errorResult(zOption.result, loading));
    }

    /**
     * 网络请求，处理完所有业务数据，不会回调HttpResult中方法，返回Observable，可以进行进一步处理
     * @param {ZHttpOption} zOption
     * @returns {Observable<T>}
     */
    public requestObservable<T>(zOption: ZHttpOption<T>): Observable<T> {
        zOption.type = zOption.type || 'post';
        zOption.header = HttpService.processHeader(zOption.header); //添加通用header
        zOption.zreply = zOption.zreply || new ZReplyDefault();
        zOption.timeOut = zOption.timeOut || 5000;
        LogUtil.log("\n===================================================================");
        LogUtil.log("ADDR:" + zOption.url);
        LogUtil.log(zOption.body ? "APPLY:" + JSON.stringify(zOption.body) : "");
        let option = zOption.type === 'get' ? {params: HttpService.getParams(zOption.body), headers: zOption.header} : {headers: zOption.header};
        let observable = zOption.type === 'get' ? this.http.get<T>(zOption.url, option) : this.http.post<T>(zOption.url, HttpService.getParams(zOption.body), option);
        return observable.timeout(zOption.timeOut)
                         .map(res => HttpService.processResponse(zOption.zreply, res))
                         .catch(error => this.processCatch(zOption.isHideToastError, error));
    }

    /**
     * 根据传入的参数输出HttpParams对象
     * @param param
     */
    private static getParams(param: any): HttpParams {
        if (param) {
            let httpParams: HttpParams;
            if (param instanceof HttpParams) {
                httpParams = param;
            } else if (typeof param === 'string') {
                httpParams = new HttpParams({fromString: param});
            } else if (typeof param === 'object') {
                for (let key in param) {
                    if (param.hasOwnProperty(key)) {
                        if (!Util.isValid(param[key])) {
                            delete param[key];
                        }
                    }
                }
                httpParams = new HttpParams({fromObject: param});
            } else {
                return param;
            }
            return httpParams;
        } else {
            return param;
        }
    }

    /**
     * 获取默认的Header信息
     */
    private static processHeader(header?: HttpHeaders): HttpHeaders {
        if (!header) {
            header = new HttpHeaders();
        }

        if (!header.has("Content-Type")) {
            header = header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        }

        if (!header.has("X-TH-TOKEN") && UserService.getToken()) {
            header = header.append("X-TH-TOKEN", UserService.getToken());
        }
        return header;
    }

    /**
     * 处理返回信息
     * @param zreply   自定义结果对象
     * @param res      http响应对象
     */
    private static processResponse(zreply: ZReply, res: any) {
        let jsonObj = res; //此处jsonObj一定有值，如果转换错误，会再processCatch中处理
        LogUtil.log("===================================================================");
        LogUtil.log("REPLY:" + JSON.stringify(jsonObj));

        if (zreply.isSuccess(jsonObj[zreply.codeKey])) {
            if (jsonObj[zreply.dataKey]) {
                return jsonObj[zreply.dataKey];
            } else {
                return jsonObj;
            }
        }

        if (!zreply.isSuccess(jsonObj[zreply.codeKey]) && (jsonObj[zreply.codeKey] || jsonObj[zreply.msgKey])) {
            throw new ZHttpError(jsonObj.code, jsonObj.msg);
        } else {                                                                    //是json对象，但是不是约定中的数据
            throw new ZHttpError(1001, "数据不符合规范：\n" + JSON.stringify(res));   //解析的json数据不符合规范
        }
    }

    /**
     * 处理异常信息
     * @param isHideToastError      是否显示errorToast
     * @param error                 错误对象
     */
    private processCatch(isHideToastError: boolean, error) {
        let errorObj: ZErrorReply;
        if (error instanceof HttpErrorResponse) {
            if (error.status == 404) {
                errorObj = HttpService.getErrorReply(error.statusText, error.status);
            } else if (error.status == 0 && error.url == null) {
                errorObj = HttpService.getErrorReply('连接服务器超时', -1);//连接超时
            } else if (error.error && error.error.error instanceof SyntaxError) {
                errorObj = HttpService.getErrorReply(error.error.error.message, error.status);//语法错误，比如json转换失败
            } else {
                errorObj = HttpService.getErrorReply(error.message, error.status);//通讯级别的错误，比如500等
            }
        } else if (error instanceof ZHttpError || (Util.isValid(error.code) && Util.isValid(error.message))) {//自己定义的错误 intanceof判断不出来？
            if (error.code === 403) {
                errorObj = HttpService.getErrorReply('登录凭证已过期，请重新登录!');//服务器返回的错误
                let activeNav: NavController = this.appCtrl.getRootNav();
                UserService.reLogin(activeNav);
            } else {
                errorObj = HttpService.getErrorReply(error.message, error.code);//服务器返回的错误
            }
        } else if (error instanceof TimeoutError) {
            errorObj = HttpService.getErrorReply('连接服务器超时', -1);//连接超时
        } else if (error instanceof Error) {
            errorObj = HttpService.getErrorReply(error.message);//程序级别的错误或者未知错误类型的错误，比如语法错误等
        } else {
            errorObj = HttpService.getErrorReply(error.message, error.status);
        }

        if (!isHideToastError) {
            let msg = Util.isValid(errorObj.code) ? errorObj.msg + "(" + errorObj.code + ")" : errorObj.msg;
            this.uiService.showToast(msg, 3000);
        }
        return Observable.throw(errorObj);
    }

    /**
     * 获取组合ErrorReply对象
     */
    private static getErrorReply(message: string, code?: number): ZErrorReply {
        let errorObj = new ZErrorReply();
        errorObj.code = code;               //自定义错误标识
        errorObj.msg = (message == null) ? "null" : message;
        return errorObj;
    }

    /**
     * 处理成功回调
     * @param {HttpResult<T>} result
     * @param loading
     * @returns {(obj) => void}
     */
    private static successResult<T>(result: HttpResult<T>, loading: Loading) {
        return (obj) => {
            if (loading) {
                loading.dismiss();
            }
            if (result.success) {
                result.success(obj);
            }

            if (result.complete) {
                result.complete();
            }
        };
    }

    /**
     * 处理错误回调
     * @param {HttpResult<T>} result
     * @param loading
     * @returns {(error) => void}
     */
    private static errorResult<T>(result: HttpResult<T>, loading: Loading) {
        return (error) => {
            if (loading) {
                loading.dismiss();
            }
            if (result.error) {
                result.error(error);
            }

            if (result.complete) {
                result.complete();
            }
        };
    }

    //==================================================返回TEXT的请求===============================================================
    /**
     * get请求
     *
     * @param url                   请求地址
     * @param zOption               请求参数
     * @param result                回调接口
     */
    public getText(url: string, zOption: ZHttpOption<string>, result: HttpResult<string>): Subscription {
        zOption = zOption || {};
        zOption.type = 'get';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.requestText(zOption);
    }

    /**
     * post请求
     *
     * @param url                   请求地址
     * @param zOption               请求参数
     * @param result                回调接口
     */
    public postText(url: string, zOption: ZHttpOption<string>, result: HttpResult<string>): Subscription {
        zOption = zOption || {};
        zOption.type = 'post';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.requestText(zOption);
    }

    /**
     * 请求字符串数据
     *
     * @param zOption               请求参数
     */
    public requestText(zOption: ZHttpOption<string>): Subscription {
        zOption.type = zOption.type || 'post';
        zOption.result = zOption.result || {};
        zOption.zreply = zOption.zreply || new ZReplyDefault();
        zOption.timeOut = zOption.timeOut || 5000;
        zOption.header = HttpService.processHeader(zOption.header); //添加通用header
        let loading = zOption.isHideLoading ? null : this.uiService.showLoading(zOption.loadingMsg);
        let restype: 'text';
        let option = {params: HttpService.getParams(zOption.body), headers: zOption.header, responseType: restype};
        let observable = zOption.type === 'get' ? this.http.get(zOption.url, option) : this.http.post(zOption.url, option);
        return observable.timeout(zOption.timeOut)
                         .catch(error => this.processCatch(zOption.isHideToastError, error))
                         .subscribe(
                             HttpService.successResult(zOption.result, loading), HttpService.errorResult(zOption.result, loading)
                         );
    }
}

