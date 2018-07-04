import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'z-page',
    templateUrl: 'z-page.html'
})
export class ZPageComponent {

    isMobile = MyApp.ISTELCHINA;

    @Input() leftButtonIconName: string;
    @Input() rightButtonIconName: string;
    @Input() rightButtonIconName2: string;
    @Input() title: string;
    @Input() barColor: string = 'light';

    @Output() leftButtonClick: EventEmitter<Event> = new EventEmitter();
    @Output() rightButtonClick: EventEmitter<Event> = new EventEmitter();
    @Output() rightButton2Click: EventEmitter<Event> = new EventEmitter();
    constructor(private navCtrl: NavController) {
    }

    ngAfterContentInit() {
        /*如果leftButtonIconName未定义并且能后退则显示后退按钮，否则按leftButtonIconName是否有值来处理是否显示按钮
         * 如果要去掉左侧按键，则leftButtonIconName传入null即可
         */
        this.leftButtonIconName = this.leftButtonIconName == undefined ? (this.navCtrl.canGoBack() ? "arrow-back" : null) : this.leftButtonIconName;
    }

    onLeftButtonClick(event: Event) {
        if (this.leftButtonIconName == "arrow-back") {
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
}
