/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UiService} from '../../providers/ui.service';

/**
 *  下拉选择组件，可以使用选择全部功能。
 *  @deprecated 建议直接使用ActionSheet
 */
@Component({
    selector: 'z-select',
    templateUrl: 'z-select.html'
})
export class ZSelectComponent {
    @Input() arrText: string[];                 //文字列表集合
    @Input() selectedPos: number | number[];    //选中的位置
    @Input() multi: boolean;                    //是否多选
    @Input() addAll: boolean;                   //是否增加‘全部’
    @Input() allSelected: boolean;              //是否全选
    @Input() allText: string;                   //‘全部’显示文字，默认‘全部’
    @Input() outLine: boolean = true;           //是否有外边框
    @Input() minWidth: string;                  //最小宽度
    @Output() onSubmit = new EventEmitter();    //确定回调
    defText: string;

    constructor(private uiService: UiService) {

    }

    ngOnChanges(changes) {
        this.refresh();
    }

    private refresh() {
        if (this.arrText) {
            if (this.multi) {
                if (this.arrText && this.selectedPos != undefined && typeof this.selectedPos != 'number' && this.arrText.length == this.selectedPos.length) {
                    this.defText = "全部"
                } else if (typeof this.selectedPos != 'number' && this.selectedPos.length > 0) {
                    this.defText = this.arrText[this.selectedPos[0]] + (this.selectedPos.length > 1 ? '...' : '');
                } else {
                    this.defText = "全部"
                }
            } else {
                let text = this.arrText ? this.arrText[this.selectedPos == undefined || typeof this.selectedPos != 'number' ? 0 : this.selectedPos] : '';
                this.defText = text || '';
            }
        }
    }

    showPopover(event) {
        if (this.multi) {
            this.uiService.showMultiSelect(
                this.arrText,
                typeof this.selectedPos == 'number' ? [this.selectedPos] : this.selectedPos,
                (selectedValue, selectedText, allSelected) => {
                    this.onSubmit.emit({selectedValue, selectedText, allSelected});
                },
                this.addAll,
                this.allSelected,
                this.allText
            );
        } else {
            // this.uiService.showSelect(
            //     this.arrText,
            //     typeof this.selectedPos == 'number' ? this.selectedPos : 0,
            //     (selectedValue, selectedText) => {
            //         this.onSubmit.emit({ selectedValue, selectedText });
            //     },
            // );
            this.uiService.showActionSheet(this.arrText, (selectedValue, selectedText) => {
                this.onSubmit.emit({selectedValue, selectedText});
            });
        }
    }

}
