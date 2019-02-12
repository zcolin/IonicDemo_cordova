import {AfterContentInit, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {BrowserUtil} from '../../utils/browser.util';

/**
 * 页面模版的基模版，定义一些公共的参数
 */
@Component({
    selector: 'z-toolbar',
    templateUrl: 'z-toolbar.html',
    styleUrls: ['z-toolbar.scss']
})
export class ZToolbarComponent implements AfterContentInit {
    @Input() toolBarColor = 'light';                                    // toolbar颜色
    @Input() startButtonContent: string | TemplateRef<any>;             // 起始按钮ng-templete
    @Input() endButtonContent: string | TemplateRef<any>;               // 结束按钮ng-templete
    @Input() endButtonContent2: string | TemplateRef<any>;              // 结束按钮ng-templete
    @Input() title: string;                                             // 标题
    @Input() overrideBack;                                              // 是否重写返回按钮逻辑，即返回按钮不是关闭当前页面
    @Input() isReload;                                                  // 是否使用重新加载功能
    @Input() canGoBack = true;                                          // 是否可以回退上个页面
    @Output() reload: EventEmitter<any> = new EventEmitter();            // 重新加载回调
    @Output() startButtonClick: EventEmitter<Event> = new EventEmitter(); // 起始按钮点击回调
    @Output() endButtonClick: EventEmitter<Event> = new EventEmitter();  // 结束按钮点击回调
    @Output() endButton2Click: EventEmitter<Event> = new EventEmitter(); // 结束第二个按钮点击回调

    isShowHeader: boolean;                     // 判断是否显示ionHeader
    headerHeight: string;                      // header高度，用于显示reload组件计算距离顶部距离
    titlePaddingHor = '8px';

    constructor(private paltform: Platform, private navCtrl: NavController) {
    }

    ngAfterContentInit() {
        /*
         * 如果leftButtonIconName未定义并且能后退则显示后退按钮，否则按leftButtonIconName是否有值来处理是否显示按钮
         * 如果要去掉左侧按键，则leftButtonIconName传入null即可
         */
        this.isShowHeader = this.title !== undefined;
        this.headerHeight = this.title === undefined ? '0px' : BrowserUtil.isAndroid(this.paltform) ? '49px' : '49px';
        this.titlePaddingHor = this.canGoBack && this.title !== undefined ? '30px' : '8px';
        this.startButtonContent = this.startButtonContent == undefined ? (this.canGoBack ? 'arrow-back' : null) : this.startButtonContent;
    }

    onStartButtonClick(event: Event) {
        if (!this.overrideBack) {
            if (this.canGoBack) {
                this.navCtrl.back();
            }
        } else {
            this.startButtonClick.emit(event);
        }
    }

    onEndButtonClick(event: Event) {
        this.endButtonClick.emit(event);
    }

    onEndButton2Click(event: Event) {
        this.endButton2Click.emit(event);
    }

    onReload() {
        this.reload.emit();
    }

    isTemplate(value: string | TemplateRef<any>) {
        return value instanceof TemplateRef;
    }
}
