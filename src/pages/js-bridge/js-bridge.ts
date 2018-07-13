import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JsBridgeUtil } from '../../providers/jsbridge/jsbridge.util';
import { UiService } from '../../providers/ui.service';
import { JsUUIDReply } from '../../providers/jsbridge/jsbridge-option';

@IonicPage()
@Component({
    selector: 'page-js-bridge',
    templateUrl: 'js-bridge.html',
})
export class JsBridgePage {
    imgsrc: string[];
    constructor(public navCtrl: NavController, public navParams: NavParams, public uiService: UiService) {
    }

    ionViewDidLoad() {
    }

    getUUID() {
        JsBridgeUtil.getUUID((reply) => {
            this.uiService.showAlert('提示', reply.uuid);
        });
    }

    toast() {
        JsBridgeUtil.toast("我是原生toast");
    }

    startWebPage() {
        JsBridgeUtil.startWebPage('http://www.163.com', '我是原生Title');
    }

    startPage() {
        JsBridgeUtil.startPage('HomePage', '我是原生Title');
    }

    getVersion() {
        JsBridgeUtil.getVersion((reply) => {
            this.uiService.showAlert('提示', `versionName:${reply.versionName}<br>versionCode:${reply.versionCode}`);
        });
    }

    scanQrCode() {
        JsBridgeUtil.scanQrCode((reply) => {
            if (reply.result) {
                this.uiService.showAlert('提示', reply.result);
            }
        });
    }

    finishPage() {
        JsBridgeUtil.finishPage();
    }

    location() {
        JsBridgeUtil.getLocation((reply) => {
            this.uiService.showAlert('提示', reply.address);
        });
    }

    share() {
        JsBridgeUtil.share('我是title', '我是content', 'http://www.baidu.com');
    }
    selectImage() {
        JsBridgeUtil.selectImage(1, 720, (reply) => {
            this.imgsrc = reply.images;
        });
    }
}
