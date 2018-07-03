import { Component } from '@angular/core';
import { NavController, IonicPage, Refresher, InfiniteScroll } from 'ionic-angular';
import { UiService } from '../../providers/ui.service';
import { BrowserUtil } from '../../providers/utils/browser.util';
import { DateUtil } from '../../providers/utils/date.util';
import { PageUtil } from '../../providers/utils/page.util';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    constructor(public navCtrl: NavController, private uiService: UiService) {

    }

    doRefresh(refresher?: Refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    doInfinite(infiniteScroll?: InfiniteScroll) {
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }
    showAlert() {
        let str = 'WindowWidth: ' + BrowserUtil.getWindowWidth() + '<br/>';
        str += 'WindowHeight: ' + BrowserUtil.getWindowHeight() + '<br/>';
        str += 'Resolution: ' + BrowserUtil.getResolution() + '<br/>';
        this.uiService.showAlert('提示', str, () => {
            this.uiService.showToast('点击了确定');
        });
    }
    showConfirm() {
        let str = DateUtil.getDate(new Date(), 'yyyy-MM-dd') + '<br/>';
        str += DateUtil.getTimeAgo(new Date('2018-06-22')) + '<br/>';

        this.uiService.showConfirm('提示', str, () => {
            this.uiService.showToast('点击了确定');
        });
    }
    showActionSheet() {
        let arrStr = ['拍照', '录视频', '发朋友圈'];
        this.uiService.showActionSheet(arrStr, (pos, arrStr) => {
            this.uiService.showToast(`点击了${arrStr}[${pos}]`);
        });
    }

    showSelect() {
        let arrStr = ['拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈'];
        this.uiService.showSelect(arrStr, 0, (pos, arrStr) => {
            this.uiService.showToast(`点击了${arrStr}[${pos}]`);
        });
    }
    showMultiSelect() {
        let arrStr = ['拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈'];
        this.uiService.showMultiSelect(arrStr, [0, 1], (pos, arrStr) => {
            this.uiService.showToast(`点击了${arrStr}[${pos}]`);
        });
    }
    showRadioAlert() {
        let arrStr = ['拍照', '录视频', '发朋友圈'];
        this.uiService.showRadioboxDialog("请选择", arrStr, 0, (pos, arrStr) => {
            this.uiService.showToast(`点击了${arrStr}[${pos}]`);
        });
    }

    showCheckboxAlert() {
        let arrStr = ['拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈'];
        this.uiService.showCheckboxDialog("请选择", arrStr, [0, 1], (sel: Array<{ index: number, label: string }>) => {
            let label: string[] = sel.map((value) => value.label);
            this.uiService.showToast(`${label.toString()}`);
        });
    }
    showProgressDialog() {
        let loading = this.uiService.showLoading();
        setTimeout(() => {
            loading.dismiss();
        }, 2000);
    }
    startItemPage() {
        PageUtil.startPage(this.navCtrl, 'ItemPage');
    }
    startVitualScrollPage() {
        PageUtil.startPage(this.navCtrl, 'VitualScrollPage');
    }
    startExternalWebPage() {
        PageUtil.startWebPage(this.navCtrl, 'http://www.qq.com/', '腾讯');
    }
}
