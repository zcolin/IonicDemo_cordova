import {ZHttpErrorReply} from './z-http-error-reply';

/**
 * Http回调类
 */
export interface ZHttpResult<T> {
    success?: (obj: T) => void;             // 成功回调
    error?: (error: ZHttpErrorReply) => void;   // 失败回调
    complete?: () => void;                  // 完成回调
}

