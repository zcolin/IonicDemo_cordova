import {ZHttpReply} from './z-http-reply';
import {ZHttpErrorReply} from './z-http-error-reply';
import {ZHttpResult} from './z-http-result';
import {Injectable} from '@angular/core';
import {Observable, Subscription, TimeoutError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {ZHttpOption} from './z-http-option';
import {ZHttpError} from './z-http-error';
import {ZHttpReplyDefault} from './z-http-reply-default';
import {ZHttpMultiRequestOption} from './z-http-multi-request-option';
import {UserService} from '../../services/biz/user.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {catchError, map, timeout} from 'rxjs/operators';
import {ZUiService} from '../services/z-ui.service';
import {ZUtil} from '../utils/z.util';
import {ZLogUtil} from '../utils/z-log.util';

/**
 * http 服务类
 */
@Injectable({
    providedIn: 'root'
})
export class ZHttpService {
    constructor(private http: HttpClient, private uiService: ZUiService) {
    }

    /**
     * 根据传入的参数输出HttpParams对象
     * @param param
     */
    private static getParams(param: HttpParams | string | {}): HttpParams {
        if (param) {
            let httpParams: HttpParams;
            if (param instanceof HttpParams) {
                httpParams = param;
            } else if (typeof param === 'string') {
                httpParams = new HttpParams({fromString: param});
            } else if (typeof param === 'object') {
                for (const key in param) {
                    if (param.hasOwnProperty(key)) {
                        if (!ZUtil.isValid(param[key])) {
                            delete param[key];
                        }
                    }
                }
                httpParams = new HttpParams({fromObject: param});
            }
            return httpParams;
        } else {
            return null;
        }
    }

    /**
     * 获取默认的Header信息
     */
    private static processHeader(header?: HttpHeaders): HttpHeaders {
        if (!header) {
            header = new HttpHeaders();
        }

        if (!header.has('Content-Type')) {
            header = header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }

        if (!header.has('X-TH-TOKEN') && UserService.getToken()) {
            header = header.append('X-TH-TOKEN', UserService.getToken());
        }
        return header;
    }

    /**
     * 处理返回信息
     * @param zreply   自定义结果对象
     * @param res      http响应对象
     */
    private static processResponse(zreply: ZHttpReply, res: any) {
        const jsonObj = res; // 此处jsonObj一定有值，如果转换错误，会再processCatch中处理
        ZLogUtil.log('===================================================================');
        ZLogUtil.log('REPLY:' + JSON.stringify(jsonObj));

        if (zreply.isSuccess(jsonObj[zreply.codeKey])) {
            if (jsonObj[zreply.dataKey]) {
                return jsonObj[zreply.dataKey];
            } else {
                return jsonObj;
            }
        }

        if (!zreply.isSuccess(jsonObj[zreply.codeKey]) && (jsonObj[zreply.codeKey] || jsonObj[zreply.msgKey])) {
            throw new ZHttpError(jsonObj.code, jsonObj.msg);
        } else {                                                                    // 是json对象，但是不是约定中的数据
            throw new ZHttpError(1001, '数据不符合规范：\n' + JSON.stringify(res));   // 解析的json数据不符合规范
        }
    }

    /**
     * 获取组合ErrorReply对象
     */
    private static getErrorReply(message: string, code?: number): ZHttpErrorReply {
        const errorObj = new ZHttpErrorReply();
        errorObj.code = code;               // 自定义错误标识
        errorObj.msg = (message == null) ? 'null' : message;
        return errorObj;
    }

    /**
     * 处理成功回调
     * @param {ZHttpResult<T>} result
     * @param loading
     * @returns {(obj) => void}
     */
    private static successResult<T>(result: ZHttpResult<T>, loading) {
        return (obj) => {
            if (loading) {
                loading.then(v => v.dismiss());
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
     * @param {ZHttpResult<T>} result
     * @param loading
     * @returns {(error) => void}
     */
    private static errorResult<T>(result: ZHttpResult<T>, loading) {
        return (error) => {
            if (loading) {
                loading.then(v => v.dismiss());
            }
            if (result.error) {
                result.error(error);
            }

            if (result.complete) {
                result.complete();
            }
        };
    }

    /**
     * get请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url                   请求地址
     * @param zOption               请求参数 {@link ZHttpError}
     * @param result                回调接口 {@link ZHttpResult}
     */
    public get<T>(url: string, zOption: ZHttpOption<T>, result: ZHttpResult<T>): Subscription {
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
     * @param result                回调接口 {@link ZHttpResult}
     */
    public post<T>(url: string, zOption: ZHttpOption<T>, result: ZHttpResult<T>): Subscription {
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
        const obArray: Observable<any>[] = [];
        const loading = multiRequestOption.isHideLoading ? null : this.uiService.showLoading(multiRequestOption.loadingMsg);
        if (multiRequestOption.option && multiRequestOption.option.length > 0) {
            for (const request of multiRequestOption.option) {
                request.result = request.result || {};
                obArray.push(this.requestObservable(request));
            }
        }

        return forkJoin(...obArray).subscribe(
            (obj) => {
                if (loading) {
                    loading.then(v => v.dismiss());
                }
                for (let i = 0; i < obj.length; i++) {
                    const item = obj[i];
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
                    loading.then(v => v.dismiss());
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
        const loading = zOption.isHideLoading ? null : this.uiService.showLoading(zOption.loadingMsg);
        return this.requestObservable<T>(zOption)
                   .subscribe(ZHttpService.successResult(zOption.result, loading), ZHttpService.errorResult(zOption.result, loading));
    }

    /**
     * 网络请求，处理完所有业务数据，不会回调HttpResult中方法，返回Observable，可以进行进一步处理
     * @param {ZHttpOption} zOption
     * @returns {Observable<T>}
     */
    public requestObservable<T>(zOption: ZHttpOption<T>): Observable<T> {
        zOption.type = zOption.type || 'post';
        zOption.header = ZHttpService.processHeader(zOption.header); // 添加通用header
        zOption.zreply = zOption.zreply || new ZHttpReplyDefault();
        zOption.timeOut = zOption.timeOut || 5000;
        ZLogUtil.log('\n===================================================================');
        ZLogUtil.log('ADDR:' + zOption.url);
        ZLogUtil.log(zOption.body ? 'APPLY:' + JSON.stringify(zOption.body) : '');
        const option = zOption.type === 'get' ? {
            params: ZHttpService.getParams(zOption.body),
            headers: zOption.header
        } : {headers: zOption.header};
        const observable = zOption.type === 'get' ? this.http.get<T>(zOption.url, option) : this.http.post<T>(zOption.url, ZHttpService.getParams(zOption.body), option);
        return observable.pipe(timeout(zOption.timeOut), map(res => ZHttpService.processResponse(zOption.zreply, res)), catchError(error => this.processCatch(zOption.isHideToastError, error)));

    }

    /**
     * 处理异常信息
     * @param isHideToastError      是否显示errorToast
     * @param error                 错误对象
     */
    private processCatch(isHideToastError: boolean, error) {
        let errorObj: ZHttpErrorReply;
        if (error instanceof HttpErrorResponse) {
            if (error.status == 404) {
                errorObj = ZHttpService.getErrorReply(error.statusText, error.status);
            } else if (error.status == 0 && error.url == null) {
                errorObj = ZHttpService.getErrorReply('连接服务器超时', -1); // 连接超时
            } else if (error.error && error.error.error instanceof SyntaxError) {
                errorObj = ZHttpService.getErrorReply(error.error.error.message, error.status); // 语法错误，比如json转换失败
            } else {
                errorObj = ZHttpService.getErrorReply(error.message, error.status); // 通讯级别的错误，比如500等
            }
        } else if (error instanceof ZHttpError || (ZUtil.isValid(error.code) && ZUtil.isValid(error.message))) {// 自己定义的错误 intanceof判断不出来？
            if (error.code === 403) {
                errorObj = ZHttpService.getErrorReply('登录凭证已过期，请重新登录!'); // 服务器返回的错误
                // const activeNav: NavController = this.appCtrl.getRootNav();
                // UserService.reLogin(activeNav);
            } else {
                errorObj = ZHttpService.getErrorReply(error.message, error.code); // 服务器返回的错误
            }
        } else if (error instanceof TimeoutError) {
            errorObj = ZHttpService.getErrorReply('连接服务器超时', -1); // 连接超时
        } else if (error instanceof Error) {
            errorObj = ZHttpService.getErrorReply(error.message); // 程序级别的错误或者未知错误类型的错误，比如语法错误等
        } else {
            errorObj = ZHttpService.getErrorReply(error.message, error.status);
        }

        if (!isHideToastError) {
            const msg = ZUtil.isValid(errorObj.code) ? errorObj.msg + '(' + errorObj.code + ')' : errorObj.msg;
            this.uiService.showToast(msg, 3000);
        }
        return Observable.throw(errorObj);
    }

    // ==================================================返回TEXT的请求===============================================================
    /**
     * get请求
     *
     * @param url                   请求地址
     * @param zOption               请求参数
     * @param result                回调接口
     */
    public getText(url: string, zOption: ZHttpOption<string>, result: ZHttpResult<string>): Subscription {
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
    public postText(url: string, zOption: ZHttpOption<string>, result: ZHttpResult<string>): Subscription {
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
        zOption.zreply = zOption.zreply || new ZHttpReplyDefault();
        zOption.timeOut = zOption.timeOut || 5000;
        zOption.header = ZHttpService.processHeader(zOption.header); // 添加通用header
        const loading = zOption.isHideLoading ? null : this.uiService.showLoading(zOption.loadingMsg);
        const restype: 'text' = 'text';
        const option = {headers: zOption.header, params: ZHttpService.getParams(zOption.body), responseType: restype};
        const observable = zOption.type === 'get' ? this.http.get(zOption.url, option) : this.http.post(zOption.url, option);
        return observable.pipe(timeout(zOption.timeOut), catchError(error => this.processCatch(zOption.isHideToastError, error)))
                         .subscribe(
                             ZHttpService.successResult(zOption.result, loading), ZHttpService.errorResult(zOption.result, loading)
                         );
    }
}

