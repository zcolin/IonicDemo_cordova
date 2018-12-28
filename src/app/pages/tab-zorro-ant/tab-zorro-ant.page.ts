import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ZUiService} from '../../frame/services/z-ui.service';
import {ModalController, PickerController, PopoverController} from '@ionic/angular';
import {PageUtil} from '../../frame/utils/page.util';

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

    skipDateTimePage() {
        PageUtil.navigate(this.router, '/ant-datetime');
    }
}
