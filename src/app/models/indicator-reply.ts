/**
 * 十三五指标
 */
export class IndicatorReply {
    targetList: Array<IndicatorTargetList>;
    year: string; // 年份
}

export class IndicatorTargetList {
    code: string;
    name: string;           // 指标名称或小项指标所属类别名称
    item: string;           // 小项指标名称
    unit: string;           // 单位
    doneValue: string;      // 完成绝对值
    goalValue: string;      // 目标绝对值
    actualGrowth: string;   // 实际年均增长（%）
    goalGrowth: string;     // 目标年均增长（%）
    totalDone: string;      // 累计完成;
    totalGoal: string;      // 目标五年累计;
    category: string;       // 所属大类
}
