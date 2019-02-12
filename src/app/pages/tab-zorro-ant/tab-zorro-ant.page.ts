import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ZUiService} from '../../frame/services/z-ui.service';
import {ModalController, PickerController, PopoverController} from '@ionic/angular';
import {PageUtil} from '../../frame/utils/page.util';
import {ActionSheet, Toast} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-tab-zorro-ant',
    templateUrl: './tab-zorro-ant.page.html',
    styleUrls: ['./tab-zorro-ant.page.scss'],
})
export class TabZorroAntPage {
    height: number = document.documentElement.clientHeight;
    nums: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    loading = false;
    drawableOpen = false;
    popoverShow = false;

    dataList = [
        {url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友'},
        {url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博'},
        {url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈'},
        {url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友'},
        {url: 'SxpunpETIwdxNjcJamwB', title: 'QQ'}
    ].map(obj => ({
        icon: `<img src="https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png" style="width:36px"/>`,
        title: obj.title
    }));

    constructor(public router: Router, private uiService: ZUiService, private  pickerCtrl: PickerController, private modalController: ModalController, private popoverCtrl: PopoverController) {
    }

    doLoad() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 5000);
    }

    openDraw(event) {
        this.drawableOpen = !this.drawableOpen;
    }

    showPopover(show: boolean) {
        this.popoverShow = show;
    }

    clickPopoverItem(event) {
        this.uiService.showToast(event.node);
    }

    skipTabsPage() {
        PageUtil.navigate(this.router, '/ant-tabs');
    }

    skipDatePicker() {
        PageUtil.navigate(this.router, '/ant-date-picker');
    }

    skipDateTimePage() {
        PageUtil.navigate(this.router, '/ant-datetime');
    }

    skipUiGather() {
        PageUtil.navigate(this.router, '/ant-ui-gather');
    }

    showShareActionSheet() {
        ActionSheet.showShareActionSheetWithOptions(
            {
                options: this.dataList,
                message: 'I am description, description, description'
            },
            (index, rowIndex) => {
                setTimeout(() => {
                    Toast.info('closed after 1000ms');
                }, 1000);
            }
        );
    }
}
