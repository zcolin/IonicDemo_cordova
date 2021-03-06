/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:53
 * ********************************************************
 */

import {ZErrorReply} from "./zerror-reply";

/**
 * Http回调类
 */
export interface HttpResult<T> {
    success?: (obj: T) => void;             //成功回调
    error?: (error: ZErrorReply) => void;   //失败回调
    complete?: () => void;                  //完成回调
}

