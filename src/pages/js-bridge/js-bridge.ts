import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { JsBridgeUtil } from '../../providers/jsbridge/jsbridge.util';
import { UiService } from '../../providers/ui.service';

@IonicPage()
@Component({
    selector: 'page-js-bridge',
    templateUrl: 'js-bridge.html',
})
export class JsBridgePage {
    imgsrc: string[];

    @ViewChild(Content) content: Content;
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
        JsBridgeUtil.selectImage(5, 720, (reply) => {
            if (reply.images && reply.images.length > 0) {
                this.imgsrc = reply.images.map((value) => value.data);
                this.uiService.showLoading().dismiss();
            }
        });
    }

    selectFile() {
        JsBridgeUtil.selectFile('image/*', (reply) => {
            if (reply.file) {
                this.uiService.showAlert("提示", `文件名称:<br>${reply.file.name}<br><br>文件地址:<br>${reply.file.path}`);
            }
        });
    }

    http() {
        let loading = this.uiService.showLoading();
        JsBridgeUtil.http("http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b", { method: "get" }, {
            success: (reply) => {
                this.uiService.showAlert("提示", JSON.stringify(reply));
            },
            error: (reply) => {
                this.uiService.showAlert("提示", `请求失败<br>错误码：${reply.code}<br><br>错误信息<br>${reply.msg}`);
            },
            complete: () => {
                loading.dismiss();
            }
        });
    }

    putStorage() {
        JsBridgeUtil.putStorage({ '我是key': '我是value' }, (reply) => {
            this.uiService.showAlert("提示", "{ '我是key': '我是value' }保存成功");
        });
    }


    getStorage() {
        JsBridgeUtil.getStorage('我是key', (reply) => {
            this.uiService.showAlert("提示", reply);
        });
    }
}
