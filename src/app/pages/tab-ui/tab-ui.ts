import {Component} from '@angular/core';
import {ModalController, PickerController} from '@ionic/angular';
import {ZUiService} from '../../frame/services/z-ui.service';
import {BrowserUtil} from '../../frame/utils/browser.util';
import {DateUtil} from '../../frame/utils/date.util';
import {PageUtil} from '../../frame/utils/page.util';
import {ListPage} from '../ionic/list-page/list-page';
import {Router} from '@angular/router';

@Component({
    selector: 'page-tab-ui',
    templateUrl: 'tab-ui.html',
    styleUrls: ['tab-ui.scss']
})

export class TabUiPage {
    imgsrc: string[] = [];
    isReload = false;

    constructor(public router: Router, private uiService: ZUiService, private  pickerCtrl: PickerController, private modalController: ModalController) {
    }

    reload() {
        this.isReload = false;
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    doInfinite(event) {
        setTimeout(() => {
            event.target.complete();
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
        let str = DateUtil.getDateStr(new Date(), 'yyyy-MM-dd') + '<br/>';
        str += DateUtil.getTimeAgo(new Date('2018-06-22')) + '<br/>';

        this.uiService.showConfirm('提示', str, () => {
            this.uiService.showToast('点击了确定');
        });
    }

    showActionSheet() {
        const arrStr = ['拍照', '录视频', '发朋友圈'];
        this.uiService.showActionSheet(arrStr, (pos, str) => {
            this.uiService.showToast(`点击了${str}`);
        });
    }

    showRadioAlert() {
        const arrStr = ['拍照', '录视频', '发朋友圈'];
        this.uiService.showRadioBoxDialog('请选择', arrStr, 0, (pos, str) => {
            this.uiService.showToast(`点击了${str}`);
        });
    }

    showCheckboxAlert() {
        const arrStr = ['拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈', '拍照', '录视频', '发朋友圈'];
        this.uiService.showCheckboxDialog('请选择', arrStr, [0, 1], (sel: Array<{ index: number, label: string }>) => {
            const label: string[] = sel.map((value) => value.label);
            this.uiService.showToast(`${label.toString()}`);
        });
    }

    showReload() {
        this.isReload = true;
    }

    showProgressDialog() {
        const loading = this.uiService.showLoading();
        setTimeout(() => {
            loading.then(v => v.dismiss());
        }, 2000);
    }

    async showPickerDialog() {
        const inputs = [];
        inputs.push({
            name: 'remark',
            suffix: '年',
            options: [{text: '1', value: 1}, {text: '2', value: 1}, {text: '3', value: 1}, {text: '4', value: 1}]
        }, {
            name: 'remark2',
            suffix: '月',
            options: [{text: '一', value: 1}, {text: '二', value: 1}, {text: '三', value: 1}, {text: '四', value: 1}]
        });
        const alert = await this.pickerCtrl.create({
            columns: inputs,
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: '确定',
                    handler: () => {

                    }
                }]
        });
        await alert.present();
        return alert;
    }

    showTextAreaDialog() {
        this.uiService.showTexDialog('TextArea', () => {
            this.uiService.showToast('OK');
        });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ListPage,
            componentProps: {
                value: 123,
                finishCallback: () => {
                    modal.dismiss();
                }
            }
        });
        await modal.present();
    }

    startItemPage() {
        this.router.navigate(['/item']);
    }

    startListPage() {
        this.router.navigate(['/list-page']);
    }

    startExternalWebPage() {
        PageUtil.startWebPage(this.modalController, 'http://www.qq.com/', '腾讯');
    }

    startInputPage() {
        this.router.navigate(['/input']);
    }

    onFileSelected(src) {
        this.imgsrc = src.map((value) => value.content);
    }
}
