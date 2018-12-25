/**
 * http图表返回数据
 */
export class ChartData {
    title: string; // 图表名称
    counttype: string; // 年份
    unit: string; // 单位
    legendData: Array<string>; // 图例
    xAxisData: Array<string>; // 横坐标
    lineData: Array<Array<number>>; // 折线数据
    barData: Array<Array<number>>; // 柱状数据
    scatterData: Array<Array<number>>; // 柱状数据
    pieData: Array<Array<number>>; // 饼状数据
    isHasCounty: string; // 是否有区县下钻
    radarData: Array<Array<number>>; // 雷达图
    lineDirection: string; // 在协议中暂时没有此字段 取horizontal或者vertical
    seriesData: Array<object>;
}
