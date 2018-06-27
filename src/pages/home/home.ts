import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UiService } from '../../providers/ui.service';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    constructor(public navCtrl: NavController, private uiService: UiService) {

    }

    showAlert() {
        this.uiService.showAlert('提示', '这是一个普通的提示框\n这是一个普通的提示框\n这是一个普通的提示框', () => {
            this.uiService.showToast('点击了确定');
        });
    }
    showConfirm() {
        this.uiService.showConfirm('提示', '这是一个普通的提示框\n这是一个普通的提示框\n这是一个普通的提示框', () => {
            this.uiService.showToast('点击了确定');
        });
    }
    showActionSheet() {
        let arrStr = ['拍照', '录视频', '发朋友圈'];
        this.uiService.showActionSheet(arrStr, (pos, arrStr) => {
            this.uiService.showToast(`点击了${arrStr}[${pos}]`);
        });
    }
    showSelect(event) {
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
}
