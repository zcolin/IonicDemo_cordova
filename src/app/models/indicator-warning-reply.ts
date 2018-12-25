/**
 * http指标预警分析返回数据
 */
export class IndicatorWarningReply {
    year: string; //截止时间
    targetList: Array<Target>;
}

export class Target {
    id: string;
    targetName: string;
    unit: string;//单位，如亿元
    code: string;//指标编码
    actual: string;//绝对值
    actualGrowth: string;//增速
    averageGrowth: string;//增速
    expectGrowth: string;//预测
    trend: string;//预警状态 1预警 2稳定 3较好
    targetGrowth: string;//年均增长目标
    lowerBound: string;//区间下届
    upperBound: string;//区间上届

    strExpectGrowth: string;//本地赋值的冗余字段，描述预测文字。
}
