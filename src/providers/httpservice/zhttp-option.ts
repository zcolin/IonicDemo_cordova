import { ZReply } from "./ZReply";
import { HttpHeaders } from "@angular/common/http";

/**
 * Http 请求参数类
 */
export interface ZHttpOption {
    body?: any;                 //请求参数
    header?: HttpHeaders;       //请求头
    isHideLoading?: boolean;    //是否显示进度条
    loadingMsg?: string;        //进度条信息
    isHideToastError?: boolean; //是否显示错误toast
    zrepley?: ZReply;           //返回值错误处理对象
}

