import { ZReply } from "./ZReply";
import { ZErrorReply } from "./zerror-reply";
import { HttpResult } from "./http-result";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import { Observable, Subscription, TimeoutError } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import { Loading } from "ionic-angular";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { ZHttpOption } from './zhttp-option';
import { ZHttpError } from './zhttp-error';
import { UiService } from "../ui.service";
import { JsBridgeUtil } from "../jsbridge/jsbridge.util";
import { Util } from "../utils/util";
import { ZReplyDefault } from "./zreply-default";

/**
 * http 服务类
 */
@Injectable()
export class HttpService {
    constructor(private http: HttpClient, private uiService: UiService) {
    }


    /**
     * get请求
     *
     * @param url                   请求地址
     * @param zoption               请求参数
     * @param result                回调接口
     */
    public get<T>(url: string, zoption: ZHttpOption, result: HttpResult<T>): Subscription {
        return this.request('get', url, zoption, result);
    }

    /**
     * post请求
     *
     * @param url                   请求地址
     * @param zoption               请求参数
     * @param result                回调接口
     */
    public post<T>(url: string, zoption: ZHttpOption, result: HttpResult<T>): Subscription {
        return this.request('post', url, zoption, result);
    }

    private request<T>(type: 'get' | 'post', url: string, zoption: ZHttpOption, result: HttpResult<T>): Subscription {
        zoption = zoption || {};
        zoption.zreply = zoption.zreply || new ZReplyDefault();
        result = result || {};
        let loading = zoption.isHideLoading ? null : this.uiService.showLoading(zoption.loadingMsg);
        let option = type === 'get' ? { params: this.getParams(zoption.body), headers: zoption.header || this.getDefHeader() } : { headers: zoption.header || this.getDefHeader() };
        let observable = type === 'get' ? this.http.get<T>(url, option) : this.http.post<T>(url, this.getParams(zoption.body), option);
        return observable
            .timeout(5000)
            .map(res => this.processResponse(zoption.zreply, res, loading))
            .catch(error => this.processCatch(loading, zoption.isHideToastError, error))
            .subscribe(
                obj => {
                    if (result.success) {
                        result.success(obj);
                    }

                    if (result.complete) {
                        result.complete();
                    }
                },
                error => {
                    if (result.error) {
                        result.error(error);
                    }

                    if (result.complete) {
                        result.complete();
                    }
                }
            );
    }

    /**
     * 根据传入的参数输出HttpParams对象
     * @param param
     */
    private getParams(param: any): HttpParams {
        if (param) {
            if (param instanceof HttpParams) {
                return param;
            } else if (typeof param == 'string') {
                return new HttpParams({ fromString: param });
            } else if (param instanceof Object) {
                return new HttpParams({ fromObject: param });
            } else {
                return param;
            }
        } else {
            return param;
        }
    }

    /**
     * 获取默认的Header信息
     */
    private getDefHeader(): HttpHeaders {
        return new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        });
    }

    /**
     * 处理返回信息
     * @param zreply   自定义结果对象
     * @param res      http响应对象
     * @param loading  进度条
     */
    private processResponse(zreply: ZReply, res: any, loading: Loading) {
        let jsonObj = res; //此处jsonObj一定有值，如果转换错误，会再processCatch中处理
        console.log(JSON.stringify(jsonObj));

        if (zreply.isSuccess(jsonObj[zreply.codeKey])) {
            if (loading) {
                loading.dismiss();
            }

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
     * @param loading               进度条
     * @param isHideToastError      是否显示errorToast
     * @param error                 错误对象
     */
    private processCatch(loading: Loading, isHideToastError: boolean, error) {
        if (loading) {
            loading.dismiss();
        }

        let errorObj: ZErrorReply;
        if (error instanceof HttpErrorResponse) {
            if (error.status == 404) {
                errorObj = this.getErrorReply(error.statusText, error.status);
            } else if (error.status == 0 && error.url == null) {
                errorObj = this.getErrorReply('连接服务器超时', -1);//连接超时
            } else if (error.error && error.error.error instanceof SyntaxError) {
                errorObj = this.getErrorReply(error.error.error.message, error.status);//语法错误，比如json转换失败
            } else {
                errorObj = this.getErrorReply(error.message, error.status);//通讯级别的错误，比如500等
            }
        } else if (error instanceof ZHttpError) {//自己定义的错误
            if (error.code === 403) {
                errorObj = this.getErrorReply('登录凭证已过期，请重新登录!');//服务器返回的错误
                setTimeout(() => {
                    // JsBridgeUtil.reLogin();
                }, 1000);
            } else {
                errorObj = this.getErrorReply(error.message, error.code);//服务器返回的错误
            }
        } else if (error instanceof TimeoutError) {
            errorObj = this.getErrorReply('连接服务器超时', -1);//连接超时
        } else if (error instanceof Error) {
            errorObj = this.getErrorReply(error.message);//程序级别的错误或者未知错误类型的错误，比如语法错误等
        } else {
            errorObj = this.getErrorReply(error.message, error.status);
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
    private getErrorReply(message: string, code?: number): ZErrorReply {
        let errorObj = new ZErrorReply();
        errorObj.code = code;               //自定义错误标识
        errorObj.msg = (message == null) ? "null" : message;
        return errorObj;
    }


    /**
    * get请求
    *
    * @param url                   请求地址
    * @param zoption               请求参数
    * @param result                回调接口
    */
    public getText(url: string, zoption: ZHttpOption, result: HttpResult<string>): Subscription {
        return this.requestText('get', url, zoption, result);
    }

    /**
    * get请求
    *
    * @param url                   请求地址
    * @param zoption               请求参数
    * @param result                回调接口
    */
    public postText(url: string, zoption: ZHttpOption, result: HttpResult<string>): Subscription {
        return this.requestText('post', url, zoption, result);
    }

    /**
    * 请求字符串数据
    *
    * @param url                   请求地址
    * @param zoption               请求参数
    * @param result                回调接口
    */
    private requestText(type: 'get' | 'post', url: string, zoption: ZHttpOption, result: HttpResult<string>): Subscription {
        zoption = zoption || {};
        zoption.zreply = zoption.zreply || new ZReplyDefault();
        result = result || {};
        let loading = zoption.isHideLoading ? null : this.uiService.showLoading(zoption.loadingMsg);
        let restype: 'text' = 'text';
        let option = { params: this.getParams(zoption.body), headers: zoption.header || this.getDefHeader(), responseType: restype };
        let observable = type === 'get' ? this.http.get(url, option) : this.http.post(url, option);
        return observable.timeout(5000)
            .map((res) => {
                if (loading) {
                    loading.dismiss();
                }
                return res;
            })
            .catch(error => this.processCatch(loading, zoption.isHideToastError, error))
            .subscribe(
                obj => {
                    if (result.success) {
                        result.success(obj);
                    }

                    if (result.complete) {
                        result.complete();
                    }
                },
                error => {
                    if (result.error) {
                        result.error(error);
                    }

                    if (result.complete) {
                        result.complete();
                    }
                }
            );
    }
}

