/**
 * 返回实体基类，定义通用参数
 */
export class BaseReply {
    code: number;       //状态码，默认code==200成功，其他失败
    msg: string;        //状态信息，正常返回错误信息
    data: any;          //数据集
}
