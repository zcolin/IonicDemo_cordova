import {Component, OnInit} from '@angular/core';
import F2 from '@antv/f2/lib/index';
import PieLabel from '@antv/f2/lib/plugin/pie-label';

@Component({
    selector: 'app-f2-charts',
    templateUrl: './f2-charts.page.html',
    styleUrls: ['./f2-charts.page.scss'],
})
// demo: https://antv.alipay.com/zh-cn/f2/3.x/demo/gallery/simple-gauge.html
export class F2ChartsPage implements OnInit {
    title: string;
    money: string;

    constructor() {
    }

    ngOnInit() {
        this.drawBarChart1();
        this.drawBarChart2();
        this.drawPieChart();
        this.drawPieChart2();
        this.drawPieChart3();
    }

    drawBarChart1() {
        // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
        const data = [
            {genre: 'Sports', sold: 275},
            {genre: 'Strategy', sold: 115},
            {genre: 'Action', sold: 120},
            {genre: 'Shooter', sold: 350},
            {genre: 'Other', sold: 150},
        ];

        // Step 1: 创建 Chart 对象
        const chart = new F2.Chart({
            id: 'myChart_1',
        });

        // Step 2: 载入数据源
        chart.source(data);
        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        chart.interval().position('genre*sold').color('genre');
        // Step 4: 渲染图表
        chart.render();
    }

    drawBarChart2() {
        const data = [
            {x: '分类一', y: [76, 100]},
            {x: '分类二', y: [56, 108]},
            {x: '分类三', y: [38, 129]},
            {x: '分类四', y: [58, 155]},
            {x: '分类五', y: [45, 120]},
            {x: '分类六', y: [23, 99]},
            {x: '分类七', y: [18, 56]},
            {x: '分类八', y: [18, 34]}];
        const chart = new F2.Chart({
            id: 'myChart_2',
        });
        chart.source(data, {
            y: {
                tickCount: 5
            }
        });
        chart.tooltip({
            showItemMarker: false,
            onShow: function onShow(ev) {
                const items = ev.items;
                items[0].name = '范围';
                const value = items[0].value;
                items[0].value = value[0] + ' 至 ' + value[1];
            }
        });
        chart.interval().position('x*y').animate({
            appear: {
                animation: 'shapesScaleInY'
            }
        });
        chart.render();
    }

    drawPieChart() {
        const map = {
            '芳华': '40%',
            '妖猫传': '20%',
            '机器之血': '18%',
            '心理罪': '15%',
            '寻梦环游记': '5%',
            '其他': '2%'
        };
        const data = [
            {name: '芳华', percent: 0.4, a: '1'},
            {name: '妖猫传', percent: 0.2, a: '1'},
            {name: '机器之血', percent: 0.18, a: '1'},
            {name: '心理罪', percent: 0.15, a: '1'},
            {name: '寻梦环游记', percent: 0.05, a: '1'},
            {name: '其他', percent: 0.02, a: '1'}];
        const chart = new F2.Chart({
            id: 'myChart_3',
        });
        chart.source(data, {
            percent: {
                formatter: function formatter(val) {
                    return val * 100 + '%';
                }
            }
        });
        chart.legend({
            position: 'right',
            itemFormatter: function itemFormatter(val) {
                return val + '  ' + map[val];
            }
        });
        chart.tooltip(true);
        chart.coord('polar', {
            transposed: true,
            radius: 0.85
        });
        chart.axis(false);
        chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
        }).animate({
            appear: {
                duration: 1200,
                easing: 'bounceOut'
            }
        });
        chart.render();
    }

    drawPieChart2() {
        const map = {
            '芳华': '40%',
            '妖猫传': '20%',
            '机器之血': '18%',
            '心理罪': '15%',
            '寻梦环游记': '5%',
            '其他': '2%'
        };
        const data = [
            {name: '芳华', percent: 0.4, a: '1'},
            {name: '妖猫传', percent: 0.2, a: '1'},
            {name: '机器之血', percent: 0.18, a: '1'},
            {name: '心理罪', percent: 0.15, a: '1'},
            {name: '寻梦环游记', percent: 0.05, a: '1'},
            {name: '其他', percent: 0.02, a: '1'}];
        const chart = new F2.Chart({
            id: 'myChart_4',
        });
        chart.source(data, {
            percent: {
                formatter: function formatter(val) {
                    return val * 100 + '%';
                }
            }
        });
        chart.legend({
            position: 'right',
            marker: 'square'
        });
        chart.tooltip(false);
        chart.coord('polar', {
            transposed: true,
            radius: 0.85,
            innerRadius: 0.618
        });
        chart.axis(false);
        chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
        });
        chart.render();
    }

    drawPieChart3() {
        const data = [{
            const: 'const',
            type: '交通出行',
            money: 51.39
        }, {
            const: 'const',
            type: '饮食',
            money: 356.68
        }, {
            const: 'const',
            type: '生活日用',
            money: 20.00
        }, {
            const: 'const',
            type: '住房缴费',
            money: 116.53
        }];
        const chart = new F2.Chart({
            id: 'myChart_5',
            plugins: PieLabel,
            pixelRatio: window.devicePixelRatio
        });
        chart.source(data);
        chart.coord('polar', {
            transposed: true,
            radius: 0.9,
            innerRadius: 0.5
        });
        chart.axis(false);
        chart.legend(false);
        chart.tooltip(false);
        chart.interval().position('const*money').adjust('stack').color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
        chart.pieLabel({
            sidePadding: 30,
            activeShape: true,
            label1: (data1) => {
                return {
                    text: '￥' + data1.money,
                    fill: '#343434',
                    fontWeight: 'bold'
                };
            },
            label2: (data1) => {
                return {
                    text: data1.type,
                    fill: '#999'
                };
            },
            onClick: (ev) => {
                const data1 = ev.data;
                if (data1) {
                    this.title = data1.type;
                    this.money = data1.money;
                }
            }
        });
        chart.render();
    }
}
