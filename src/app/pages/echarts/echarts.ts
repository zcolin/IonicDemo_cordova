import {Component, OnInit} from '@angular/core';
import * as ECharts from 'echarts';
import {DbapiProvider} from '../../services/dbapi/dbapi';
import {Location} from '@angular/common';

@Component({
    selector: 'page-echarts',
    templateUrl: 'echarts.html',
    styleUrls: ['echarts.scss']
})
export class EchartsPage implements OnInit {
    constructor(private db: DbapiProvider) {
    }

    ngOnInit() {
        this.createBarCharts();
        this.createPieChart();
        this.createGroupBarEchart();
        this.createStackBarEcharts();
        this.createLineChart();
        this.createStackLineEcharts();
        this.createGradientLineEcharts();
        this.createCombinedEcharts();
        this.createRadarEcharts();
    }

    createBarCharts() {
        this.db.getBarData(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('barEcharts') as HTMLDivElement);
            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 20, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                antimation: [true], // 是否显示动画
                series: [{
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside', // 标签位置
                        fontSize: 12,
                        color: '#000'
                    },
                    data: responseData.seriesData
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.setOption({
                title: {text: '柱状图示例'}
            });
        });
    }

    createPieChart() {
        this.db.getPieChartDAta(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('pieEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                legend: {
                    data: response.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 60, right: 60, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                antimation: [true], // 是否显示动画
                color: ['green', 'blue', 'red'], // 数据区颜色
                series: [{
                    type: 'pie',
                    hoverAnimation: true, // 是否开启扇形区hover时放大动画
                    hoverOffset: 10,
                    radius: ['0', '60%'], // 第一个数是内半径，第二个是外半径
                    roseType: false, // 是否显示玫瑰图
                    label: {
                        position: 'inside', // 标签位置
                        fontSize: 12,
                        color: '#000'
                    },
                    itemStyle: {
                        borderType: 'solid', // 柱条的描边类型还可以是dashed和dotted
                        barBorderRadius: 0, // 默认是0，是柱状的圆角半径
                    },
                    data: responseData.seriesData
                }]
            };
            myChart.setOption(option);
        });
    }

    createGroupBarEchart() {
        this.db.getGroupBarEcharts(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('groupBarEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 30, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                color: ['red', 'blue', 'green', 'yellow'],
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                antimation: [true], // 是否显示动画
                series: responseData.seriesData
            };
            myChart.setOption(option);
        });

    }

    createStackBarEcharts() {
        this.db.getStackBarEcharts(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('stackBarEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 30, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                color: ['red', 'blue', 'green', 'yellow'],
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                antimation: [true], // 是否显示动画
                series: responseData.seriesData
            };
            myChart.setOption(option);
        });
    }

    createLineChart() {
        this.db.getLineEcharts(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('lineEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'axis'// 控制数据显示方式，不设置鼠标放上时是单个显示，设置是当前列显示
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 30, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                color: ['red', 'blue', 'green', 'yellow'],
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    boundaryGap: false, // 坐标轴两边是否留白
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                smooth: false, // 是否平滑曲线显示
                antimation: [true], // 是否显示动画
                series: responseData.seriesData
            };
            myChart.setOption(option);
        });

    }

    createStackLineEcharts() {
        this.db.getStackLineEcharts(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('stackLineEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'axis'// 控制数据显示方式，不设置鼠标放上时是单个显示，设置是当前列显示
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 30, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                color: ['red', 'blue', 'green', 'yellow'],
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    boundaryGap: false, // 坐标轴两边是否留白
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                smooth: false, // 是否平滑曲线显示
                antimation: [true], // 是否显示动画
                series: responseData.seriesData
            };
            myChart.setOption(option);
        });
    }

    createGradientLineEcharts() {
        this.db.getGradientLineEcharts(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('gradientLineEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'axis'// 控制数据显示方式，不设置鼠标放上时是单个显示，设置是当前列显示
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 30, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    boundaryGap: false, // 坐标轴两边是否留白
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                smooth: false, // 是否平滑曲线显示
                antimation: [true], // 是否显示动画
                series: [
                    {
                        data: responseData.seriesData,
                        type: 'line',
                        label: {
                            show: true, // 默认是false
                            position: 'top', fontSize: 10
                        },
                        areaStyle: {
                            normal: {
                                color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(238,103,35,0.5)'
                                }, {offset: 1, color: 'rgba(238,103,35,0.00)'}])
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        });
    }

    createCombinedEcharts() {
        this.db.getCombinedEcharts(function (response) {
            const responseData = JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('combinedEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: responseData.title,
                    subtext: '',
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                    textStyle: {
                        fontSize: 14,
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'axis'// 控制数据显示方式，不设置鼠标放上时是单个显示，设置是当前列显示
                },
                legend: {
                    data: responseData.legendData,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                // backgroundColor:['rgb(0,0,0)'],
                grid: {left: 30, right: 10, top: 60, bottom: 60}, // 调整图表在父布局中的位置
                xAxis: {
                    position: 'bottom',
                    type: 'category', // category代表类目轴，value代表数值轴，time时间轴，想使用横向柱状图时x轴类型选value，y轴类型选category即可
                    inverse: false, // 是否反向坐标轴
                    boundaryGap: true, // 坐标轴两边是否留白
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true,
                    }, // 坐标轴线
                    splitLine: {
                        show: false
                    },
                    data: responseData.xAxisData
                },
                yAxis: {
                    position: 'left',
                    type: 'value',
                    axisLabel: {
                        fontSize: 12,
                        rotate: 0
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                antimation: [true], // 是否显示动画
                series: [
                    {
                        data: responseData.seriesData1,
                        type: 'line',
                        label: {
                            show: true, // 默认是false
                            position: 'top', fontSize: 10
                        },
                    },
                    {
                        data: responseData.seriesData2,
                        type: 'bar',
                        label: {
                            show: true, // 默认是false
                            position: 'inside', fontSize: 10
                        },
                    }
                ]
            };
            myChart.setOption(option);
        });
    }

    createRadarEcharts() {
        this.db.getRadarEcharts(function (response) {
            // let responseData=JSON.parse(response);
            const myChart = ECharts.init(document.getElementById('radarEcharts') as HTMLDivElement);
            const option = {
                title: {
                    text: '基础雷达图',
                    textStyle: {
                        fontSize: 12,
                        color: '#000'
                    },
                    left: 'auto',
                    right: 'auto',
                    bottm: 'auto',
                    top: 'auto',
                },
                color: ['red', 'green'],
                tooltip: {},
                legend: {
                    data: ['预算分配', '实际开销'],
                    textStyle: {
                        fontSize: 10,
                        color: '#000'
                    },
                    left: 'auto',
                    right: '0',
                    bottm: 'auto',
                    top: 'auto'
                },
                radar: {
                    // shape: 'circle',
                    center: ['50%', '50%'],
                    radius: '60%',
                    splitNumber: '5',
                    axisLine: {
                        show: true
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,0.3)', 'rgba(200,200,200,0.3)']
                        }
                    },
                    name: {
                        fontSize: 10,
                        textStyle: {
                            color: '#000',
                        }
                    },
                    indicator: [
                        {name: '销售', max: 6500},
                        {name: '管理', max: 16000},
                        {name: '信息技术', max: 30000},
                        {name: '客服', max: 38000},
                        {name: '研发', max: 52000},
                        {name: '市场', max: 25000}
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    label: {
                        show: true,
                        fontSize: 10
                    },
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '预算分配',
                            areaStyle: {}
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: '实际开销',
                            areaStyle: {}
                        }
                    ]
                }]
            };
            myChart.setOption(option);
        });
    }
}
