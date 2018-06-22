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
    @Input() title: string;

    @Output() leftButtonClick: EventEmitter<Event> = new EventEmitter();
    @Output() rightButtonClick: EventEmitter<Event> = new EventEmitter();
    constructor(private navCtrl: NavController) {
    }

    ngAfterContentInit() {
        this.leftButtonIconName = this.leftButtonIconName || (this.navCtrl.canGoBack() ? "arrow-back" : null); //如果能后退，则显示后退按钮，否则隐藏
    }

    /**
     * 如果没有手动设置左侧图标，则默认为返回键
     */
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

}
