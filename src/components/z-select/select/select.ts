/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-select',
    templateUrl: 'select.html',
})
export class SelectPage {
    datas = [];                         //数据
    selectedPos: Array<number> = [];    //选中位置
    multi: boolean;                     //是否是多选
    addAll: boolean;                    //是否增加'全部'
    allText: string;                    //全部的文字描述
    allSelected: boolean;               //'全部'是否被选中
    constructor(public viewCtrl: ViewController, nvaparams: NavParams) {
        this.datas = nvaparams.get("texts");
        this.multi = nvaparams.get("isMulti");
        let arrPos = nvaparams.get("selectPos");
        if (arrPos) {
            this.selectedPos.push(...arrPos);
        }

        /*增加选中全部，则默认为多选 */
        this.addAll = nvaparams.get("isAddAll");
        if (this.addAll) {
            this.multi = true;
        }

        this.allText = nvaparams.get("allText");
        this.allText = this.addAll ? (this.allText || '全部') : '';

        /*传入了选中全部，则所有子项选中 */
        this.allSelected = nvaparams.get("isAllSelected");
        if (this.allSelected) {
            this.selectedPos = [];
            for (let index = 0; index < this.datas.length; index++) {
                this.selectedPos.push(index);
            }
        }

        this.allSelected = this.selectedPos.length >= this.datas.length;
    }

    /**
     * 点击'全部'
     */
    clickAllItem() {
        if (this.selectedPos.length < this.datas.length) {      //没有全部选中
            this.allSelected = true;
            this.selectedPos = [];
            for (let index = 0; index < this.datas.length; index++) {
                this.selectedPos.push(index);
            }
        } else {
            this.selectedPos = [];
            this.allSelected = false;
        }
    }

    clickItem(index: number) {
        if (!this.multi) {
            this.viewCtrl.dismiss({selectedPos: index, selectedText: this.datas[index]});
        } else {
            let pos = this.selectedPos.indexOf(index);
            if (pos > -1) {
                this.selectedPos.splice(pos, 1);
            } else {
                this.selectedPos.push(index);
            }
            this.allSelected = this.selectedPos.length == this.datas.length;
        }
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    submit() {
        this.selectedPos.sort();
        let selectText = [];
        for (const index of this.selectedPos) {
            selectText.push(this.datas[index]);
        }
        this.viewCtrl.dismiss({selectedPos: this.selectedPos, selectedText: selectText, allSelected: this.allSelected});
    }
}
