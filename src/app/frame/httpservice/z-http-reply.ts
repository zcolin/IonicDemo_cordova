/**
 * Http返回数据判定接口，可以实现自定义结果判定
 */
export interface ZHttpReply {
    isSuccess: (code) => boolean;       // 自定义结果是否成功
    msgKey?: string;                    // 服务器返回信息字段
    codeKey?: string;                   // 服务器返回标识字段
    dataKey?: string;                   // 服务器返回标识字段
}
