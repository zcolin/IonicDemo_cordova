/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MyApp} from '../../app/app.component';
import {NavController} from 'ionic-angular';

/**
 * 页面模版的基模版，定义一些公共的参数
 */
@Component({
    selector: 'z-page',
    templateUrl: 'z-page.html'
})
export class ZPageComponent {
    @Input() leftButtonIconName: string;        //左侧按钮图片name
    @Input() rightButtonIconName: string;       //右侧按钮图片name
    @Input() rightButtonIconName2: string;      //右侧第二个按钮图片name
    @Input() title: string;                     //标题
    @Input() barColor: string = 'white';        //toolbar颜色
    @Input() overrideBack;                      //是否重写返回按钮逻辑，即返回按钮不是关闭当前页面
    @Input() isReload;                          //是否使用重新加载功能
    @Output() reload: EventEmitter<any> = new EventEmitter();               //重新加载回调
    @Output() leftButtonClick: EventEmitter<Event> = new EventEmitter();    //左侧按钮点击回调
    @Output() rightButtonClick: EventEmitter<Event> = new EventEmitter();   //右侧按钮点击回调
    @Output() rightButton2Click: EventEmitter<Event> = new EventEmitter();  //右侧第二个按钮点击回调

    isShowToolBar: boolean;                   //判断是否显示toolbar
    toolbarHeight: string;                    //toolbar高度，用于显示reload组件计算距离顶部距离
    titlePaddingLR = '8px';

    constructor(private navCtrl: NavController) {
    }

    ngAfterContentInit() {
        /*如果leftButtonIconName未定义并且能后退则显示后退按钮，否则按leftButtonIconName是否有值来处理是否显示按钮
         * 如果要去掉左侧按键，则leftButtonIconName传入null即可
         */
        this.isShowToolBar = this.title !== undefined;
        this.toolbarHeight = this.title === undefined ? '0px' : MyApp.ISANDROID ? '56px' : '56px';
        this.titlePaddingLR = this.navCtrl.canGoBack() && this.title !== undefined ? "30px" : "8px";
        this.leftButtonIconName = this.leftButtonIconName == undefined ? (this.navCtrl.canGoBack() ? "arrow-back" : null) : this.leftButtonIconName;
    }

    onLeftButtonClick(event: Event) {
        if (!this.overrideBack) {
            if (this.navCtrl.canGoBack()) {
                this.navCtrl.pop();
            }
        } else {
            this.leftButtonClick.emit(event);
        }
    }

    onRightButtonClick(event: Event) {
        this.rightButtonClick.emit(event);
    }

    onRightButton2Click(event: Event) {
        this.rightButton2Click.emit(event);
    }

    onReload() {
        this.reload.emit()
    }
}
