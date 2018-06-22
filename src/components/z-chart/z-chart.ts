import { ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Component, Input } from '@angular/core';
import ECharts, { EChartOption } from "echarts";
import { ChartData } from '../../models/chart-data';
@Component({
    selector: 'z-chart',
    templateUrl: 'z-chart.html'
})
export class ZChartComponent {
    @ViewChild('zcomponent_chart') container: ElementRef;
    @ViewChild('zcomponent_chart_empty') containerEmpty: ElementRef;

    @Input() zheight: number;
    @Input() zoption: any;
    @Input() zdata: ChartData;
    @Input() notMerge: boolean = true;
    @Input() barColor = ["#4a33ab", "#5f69c3", "#8754df", "#a739f0"];
    @Input() lineColor = ["#ff9800", "#03e324", "#5f69c3"];
    @Input() combineColor = ["#4a33ab", "#ff9800", "#7050bf", "#03e324", "#5f69c3"];
    @Input() pieColor = ["#4a33ab", "#504cb9", "#6b55bf", "#7066c6", "#9077cd", "#a087cd", "#a097cd", "#afa5db", "#a093d4", "#bfb7e2", "#cfc8e9", "#eae5ff"];
    @Input() gradientLine = [{ "offset0": "rgba(238,103,35,0.5)", "offset1": "rgba(238,103,35,0.00)" }, { "offset0": "rgba(238,103,35,0.5)", "offset1": "rgba(238,103,35,0.00)" }, { "offset0": "rgba(238,103,35,0.5)", "offset1": "rgba(238,103,35,0.00)" }, { "offset0": "rgba(238,103,35,0.5)", "offset1": "rgba(238,103,35,0.00)" }, { "offset0": "rgba(238,103,35,0.5)", "offset1": "rgba(238,103,35,0.00)" }];
    @Output() itemClick = new EventEmitter();
    myChart: ECharts.ECharts;
    isShowEmpty: boolean;
    constructor() {

    }

    ngOnChanges(changes) {
        setTimeout(() => {
            this.refresh();
        }, 300);
    }

    refresh() {
        if (this.zheight) {
            if (this.container) {
                this.container.nativeElement.style.height = this.zheight + 'px';
            }

            if (this.containerEmpty) {
                this.containerEmpty.nativeElement.style.height = this.zheight + 'px';
            }
        }

        if (!this.myChart && this.container) {
            this.myChart = ECharts.init(this.container.nativeElement);
            this.myChart.on('click', (params) => {
                this.itemClick.emit(params)
            });
        }

        if (this.myChart) {
            /**如果设置了zoption则以zoption为准，否则以zdata为准 */
            let option;
            if (this.zoption) {
                option = this.zoption;
                this.isShowEmpty = false;
            } else {
                if (this.zdata) {
                    option = this.createChart(this.zdata);
                    this.isShowEmpty = this.isEmpty(this.zdata) && (this.zdata.pieData ? true : false); //只有饼图显示暂无数据
                }
            }

            if (option) {
                this.myChart.setOption(option, this.notMerge);
            }
        }
    }


    /**
     * chartData数据是否为空
     * @param chartData
     */
    public isEmpty(chartData: ChartData): boolean {
        return this.isDataEmpty(chartData.pieData) && this.isDataEmpty(chartData.barData) && this.isDataEmpty(chartData.lineData) && this.isDataEmpty(chartData.scatterData);
    }

    /**
     * 根据返回数据自动判断图标类型
     * @param chartData
     */
    public createChart(chartData: ChartData): EChartOption {
        if (chartData.pieData) { //饼状图
            return this.createPieChart(chartData);
        } else if (chartData.barData && chartData.lineData) { //线、柱组合图
            return this.createCombinedChart(chartData, "barLine");
        } else if (chartData.barData && chartData.scatterData) {
            return this.createCombinedChart(chartData, "barScatter");
        } else if (chartData.lineData) {                          //柱状图
            return this.createLineChart(chartData);
        } else if (chartData.barData) {                         //折线图
            if (chartData.lineDirection == 'horizontal') {
                return this.createHorizontalBarChart(chartData);
            } else {
                return this.createBarChart(chartData);
            }
        }
    }

    /**
     * 创建piechart
     */
    createPieChart(chartData: ChartData): EChartOption {
        let seriesdata: Array<any> = [];
        if (chartData.pieData.length > 0) {
            let radiusData: Array<any> = [];
            let radiusWidth = (100 - 20 - 10 * (chartData.pieData.length - 1)) / chartData.pieData.length;
            for (let i = 0; i < chartData.pieData.length; i++) {
                radiusData.push([i * radiusWidth + i * 10, (i + 1) * radiusWidth + i * 10])

            }
            for (let i = 0; i < chartData.pieData.length; i++) {
                let seriesPieData: Array<any> = [];
                for (let j = 0; j < chartData.xAxisData.length; j++) {
                    seriesPieData.push({
                        value: chartData.pieData[i][j],
                        name: chartData.xAxisData[j]
                    })
                }
                seriesdata.push(
                    {
                        type: 'pie',
                        hoverAnimation: true,//是否开启扇形区hover时放大动画
                        hoverOffset: 10,
                        radius: radiusData[i],//第一个数是内半径，第二个是外半径
                        roseType: false,//是否显示玫瑰图
                        label: i == chartData.pieData.length - 1 ? {//只显示最后一个圆的标签
                            position: 'outside',
                            fontSize: 12,
                            color: '#000'
                        } : { show: false },
                        itemStyle: {
                            borderType: 'solid',//柱条的描边类型还可以是dashed和dotted
                            barBorderRadius: 0,//默认是0，是柱状的圆角半径
                        },
                        data: seriesPieData
                    }
                )
            }
        }
        let option = {
            title: this.getTitleParam(chartData.title),
            //legend:this.getPieLegendParam(chartData.xAxisData),
            color: this.pieColor,//数据区颜色
            tooltip: this.getToolTipParam(chartData.unit),
            series: seriesdata
        };
        return option;
    }

    /**
     * 创建柱状图（单一，堆叠，或者分组）
     * @param stack          是否为堆叠图
     */
    createBarChart(chartData: ChartData): EChartOption {
        let seriesdata: Array<any> = [];
        for (let i = 0; i < chartData.barData.length; i++) {
            seriesdata.push({
                'name': chartData.legendData ? chartData.legendData[i] : null,
                'type': 'bar',
                'stack': "堆叠",
                'barGap': '10%',
                'barCategoryGap': '60%',
                // 'label': { 'show': true, 'fontSize': 8, 'position': 'inside' },
                'data': chartData.barData[i]
            })
        }
        let option = {
            title: this.getTitleParam(chartData.title),
            legend: this.getLegendParam(chartData.legendData),
            xAxis: this.getXAxisParam(chartData.xAxisData),
            yAxis: this.getYAxisParam(chartData.unit),
            tooltip: this.getToolTipParam(chartData.unit),
            color: this.barColor,
            grid: { left: "12%" },
            series: seriesdata
        };
        return option;
    }

    /**
     * 创建折线图（单一，堆叠，或者分组）
     * @param stack          是否为堆叠图
     */
    createLineChart(chartData: ChartData): EChartOption {
        let seriesdata: Array<any> = [];
        if (chartData.lineData.length > 0) {
            for (let i = 0; i < chartData.lineData.length; i++) {
                seriesdata.push({
                    'name': chartData.legendData ? chartData.legendData[i] : null,
                    'type': 'line',
                    //'label': { 'show': true, 'fontSize': 8, 'position': 'top' },

                    'data': chartData.lineData[i],
                    areaStyle: {
                        normal: {
                            color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: this.gradientLine[i].offset0
                            }, { offset: 1, color: this.gradientLine[i].offset1 }])
                        }
                    }
                })
            }
        } else {
            seriesdata.push({
                'type': 'line',
                //'label': { 'show': true, 'fontSize': 8, 'position': 'top' },
                'data': chartData.lineData[0],
                areaStyle: {
                    normal: {
                        color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(238,103,35,0.5)'
                        }, { offset: 1, color: 'rgba(238,103,35,0.00)' }])
                    }
                }
            })
        }
        let option = {
            title: this.getTitleParam(chartData.title),
            legend: this.getLegendParam(chartData.legendData),
            xAxis: this.getXAxisParam(chartData.xAxisData),
            yAxis: this.getYAxisParam(chartData.unit),
            tooltip: this.getToolTipParam(chartData.unit),
            color: this.lineColor,
            grid: { left: "12%" },
            series: seriesdata
        };
        return option;
    }

    /**
     * 创建横向柱状图
     * @param stack          是否为堆叠图
     */
    createHorizontalBarChart(chartData: ChartData): EChartOption {
        let seriesdata: Array<any> = [];
        for (let i = 0; i < chartData.barData.length; i++) {
            seriesdata.push({
                'name': chartData.legendData ? chartData.legendData[i] : null,
                'type': 'bar',
                'stack': "堆叠",
                'barGap': '10%',
                'barCategoryGap': '60%',
                'label': { 'show': true, 'fontSize': 8, 'position': 'right' },
                'data': chartData.barData[i]
            })
        }
        let option = {
            title: this.getTitleParam(chartData.title),
            legend: this.getLegendParam(chartData.legendData),
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: this.getYAxisParam(chartData.unit),
            yAxis: this.getXAxisParam(chartData.xAxisData, 0, true),
            tooltip: this.getToolTipParam(chartData.unit, true, false),
            color: this.barColor,
            series: seriesdata
        };
        return option;
    }
    /**
    * 创建柱折结合图
    *
    */
    createCombinedChart(chartData: ChartData, lineOrScatter: string): EChartOption {
        let seriesdata: Array<any> = [];
        seriesdata.push({
            'yAxisIndex': 0,
            'name': chartData.legendData[0],
            'type': 'bar',
            'stack': "堆叠",
            'barGap': '30%',
            'barCategoryGap': '60%',
            //'label': { 'show': true, 'fontSize': 8, 'position': 'top' },
            'data': chartData.barData[0]
        });
        if (lineOrScatter == "barLine") {
            seriesdata.push({
                'yAxisIndex': 1,
                'name': chartData.legendData[1],
                'type': 'line',
                //'label': { 'show': true, 'fontSize': 8, 'position': 'top' },
                'data': chartData.lineData[0]
            })
        } else if (lineOrScatter == "barScatter") {
            seriesdata.push({
                'yAxisIndex': 1,
                'name': chartData.legendData[1],
                'type': 'scatter',
                //'label': { 'show': true, 'fontSize': 8, 'position': 'top' },
                'data': chartData.scatterData[0]
            })
        }
        let option = {
            title: this.getTitleParam(chartData.title),
            legend: this.getLegendParam(chartData.legendData),
            xAxis: this.getXAxisParam(chartData.xAxisData),
            yAxis: [this.getYAxisParam(chartData.unit), this.getYAxisParam('%', 'right')],
            tooltip: this.getToolTipParam(chartData.unit,true),
            color: this.combineColor,
            grid: { left: "12%" },
            series: seriesdata
        };
        return option;
    }

    /**
     * 获取公共Title配置
     * @param title
     */
    getTitleParam(title: string) {
        return {
            text: title,
            subtext: '',
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#333'
            }
        };
    }

    /**
     * 公共图例配置
     */
    getLegendParam(legendData: Array<string>) {
        return {
            type: 'scroll',
            data: legendData,
            textStyle: {
                fontSize: 12,
                color: '#333'
            },
            left: 'center',
            bottom: '0'
        };
    }

    /**
     * 饼状图图例配置
     */
    getPieLegendParam(legendData: Array<string>) {
        return {
            orient: 'vertical',
            type: 'scroll',
            data: legendData,
            textStyle: {
                fontSize: 12,
                color: '#333'
            },
            right: '0',

        };
    }

    /**
     * 公共X轴配置
     * @param data   x轴标题集合
     */
    getXAxisParam(data: Array<string>, rotate?: number, inverse?: boolean) {
        return {
            type: 'category',//category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
            boundaryGap: true,//坐标轴两边是否留白
            inverse: inverse == undefined ? false : inverse,
            axisLabel: {
                fontSize: 8,
                rotate: rotate != undefined ? rotate : -45
            },
            axisTick: {                 //坐标轴刻度相关设置。
                alignWithLabel: true    //类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            data: data
        }
    }

    /**
     * 公共y轴配置
     * @param data      y轴标题集合
     * @param position  y轴位置
     */
    getYAxisParam(data: string,position?: string, inverse?: boolean) {
        return {
            type: 'value',
            boundaryGap: true,//坐标轴两边是否留白
            inverse: inverse == undefined ? false : inverse,
            axisLabel: {
                fontSize: 8,
            },
            name: data,
            position: position ? position : 'left',
            max: (value) => {
                return value.max;
            },
            splitLine: {
                show: false
            },
            axisTick: {                 //坐标轴刻度相关设置。
                alignWithLabel: true    //类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            }
        }
    }

    getToolTipParam(unit: string, combine?: boolean, show?: boolean) {
        unit = unit == undefined ? "" : unit;
        let toolTipParam = combine == true ? {
            trigger: 'axis',
            show: show == undefined ? true : show,
            triggerOn: 'click',
            formatter: "{b}</br>{a0}: {c0}" + unit + "</br>{a1}: {c1}%"
        } : {
                show: show == undefined ? true : show,
                triggerOn: 'click',
                formatter: "{b}: {c}" + unit
            };
        return toolTipParam;
    }

    private isDataEmpty(datas) {
        if (datas && datas.length > 0) {
            for (const iterator of datas) {
                if (iterator && iterator instanceof Array && iterator.length > 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
