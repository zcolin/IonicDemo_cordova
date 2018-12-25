import {Injectable} from '@angular/core';

@Injectable()
export class DbapiProvider {
    constructor() {
    }

    getBarData(callback) {
        // this.jsbridge.callHandler("{'obj':'xxx','omg':'yyy}", callback);
        callback('{"title":"柱状图","subtitle":"123","legendData":["a","b","c"],"xAxisData":["上班","睡觉","打dota"],"seriesData":[{"name": "A","value": "10","itemStyle":{"color":"red"}},' +
            ' {"name": "B", "value": "20","itemStyle":{"color":"blue"}}, { "name": "C","value": "30","itemStyle":{"color":"green"}}]}');
    }

    getPieChartDAta(callback) {
        callback('{"title":"饼状图","legendData":["a","b","c"],"seriesData":[{"name": "A","value": 10 }, {"name": "B", "value": 20}, {"name": "C","value": 30 }]}');
    }

    getGroupBarEcharts(callback) {
        callback('{"title":"分组柱状图","legendData":["Forest","Steppe","Desert","Wetland"],"xAxisData":["组图1","组图2","组图3","组图4","组图5"],' +
            '"seriesData":[{"name": "Forest","type": "bar","barGap":"10%","label": {"show":true,"fontSize":10},"data": [320, 332, 301, 334, 390]},' +
            '{"name": "Steppe","type": "bar","barGap":"10%","label": {"show":true,"fontSize":10},"data": [220, 182, 191, 234, 290]},' +
            '{"name": "Desert","type": "bar","barGap":"10%","label": {"show":true,"fontSize":10},"data": [150, 232, 201, 154, 190]},' +
            '{"name": "Wetland","type": "bar","barGap":"10%","label": {"show":true,"fontSize":10},"data": [98, 77, 101, 99, 40] }]}');
    }

    getStackBarEcharts(callback) {
        callback('{"title":"堆叠柱状图","legendData":["Forest","Steppe","Desert","Wetland"],"xAxisData":["组图1","组图2","组图3","组图4","组图5"],' +
            '"seriesData":[{"name": "Forest","type": "bar","stack":"数量","label": {"show":true,"fontSize":10,"position":"insideRight"},' +
            '"data": [320, 332, 301, 334, 390]},{"name": "Steppe","type": "bar","stack":"数量","label": {"show":true,"fontSize":10,"position":"insideRight"},"data": [220, 182, 191, 234, 290]},' +
            '{"name": "Desert","type": "bar","stack":"数量","label": {"show":true,"fontSize":10,"position":"insideRight"},"data": [150, 232, 201, 154, 190]},' +
            '{"name": "Wetland","type": "bar","stack":"数量","label": {"show":true,"fontSize":10,"position":"insideRight"},"data": [98, 77, 101, 99, 40] }]}');
    }

    getLineEcharts(callback) {
        callback('{"title":"折线图","legendData":["Forest","Steppe","Desert","Wetland"],"xAxisData":["点1","点2","点3","点4","点5"],"seriesData":[{"name": "Forest","areaStyle":{},' +
            '"type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [320, 332, 301, 334, 390]},' +
            '{"name": "Steppe","areaStyle":{},"type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [220, 182, 191, 234, 290]},' +
            '{"name": "Desert","areaStyle":{},"type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [150, 232, 201, 154, 190]},' +
            '{"name": "Wetland","areaStyle":{},"type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [98, 77, 101, 99, 40] }]}');
    }

    getStackLineEcharts(callback) {
        callback('{"title":"堆叠折线图","legendData":["Forest","Steppe","Desert","Wetland"],"xAxisData":["点1","点2","点3","点4","点5"],"seriesData":[{"name": "Forest","stack":"数量",' +
            '"areaStyle":{},"type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [320, 332, 301, 334, 390]},' +
            '{"name": "Steppe","areaStyle":{},"type": "line","stack":"数量","label": {"show":true,"fontSize":10,"position":"top"},"data": [220, 182, 191, 234, 290]},' +
            '{"name": "Desert","areaStyle":{},"stack":"数量","type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [150, 232, 201, 154, 190]},' +
            '{"name": "Wetland","areaStyle":{},"stack":"数量","type": "line","label": {"show":true,"fontSize":10,"position":"top"},"data": [98, 77, 101, 99, 40] }]}');
    }

    getGradientLineEcharts(callback) {
        callback('{"title":"渐变折线图","legendData":[],"xAxisData":["点1","点2","点3","点4","点5"],"seriesData":[100,200,100,200,100]}');
    }

    getCombinedEcharts(callback) {
        callback('{"title":"混合图","legendData":[],"xAxisData":["点1","点2","点3","点4","点5"],"seriesData1":[100,200,100,200,100],"seriesData2":[100,200,100,200,100]}');
    }

    getRadarEcharts(callback) {
        callback('');
    }
}
