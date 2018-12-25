/**
 * http图表分类返回数据
 */
export class ChartTypeReply {
    name: string;
    target: string;
    children: Array<ChartTypeReply>;

    isSecondType: boolean;// 本地冗余字段，标识是否二级分类，收到服务器数据之后，将子数据压入list中
}
