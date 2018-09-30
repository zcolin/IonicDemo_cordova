/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-8-15 上午10:55
 * ********************************************************
 */

import {ZHttpOption} from "./zhttp-option";

/**
 * 多个合并请求参数
 */
export interface ZHttpMultiRequestOption {
    option: ZHttpOption<any>[];      //单个请求参数数组
    isHideLoading?: boolean;    //是否显示进度条
    loadingMsg?: string;        //进度条信息
}
