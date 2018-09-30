/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:53
 * ********************************************************
 */

import { ZReply } from "./ZReply";

/**
 * 默认的返回码判断，
 * @dpre
 */
export class ZReplyDefault implements ZReply {
    isSuccess = (code) => code == 200;       //自定义结果是否成功
    msgKey = 'msg';                         //服务器返回信息字段
    codeKey = 'code';                       //服务器返回标识字段
    dataKey = 'data';                       //服务器返回标识字段
}
