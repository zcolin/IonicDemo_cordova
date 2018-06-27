import {
    ActionSheet,
    ActionSheetButton,
    ActionSheetController,
    Alert,
    AlertController,
    Loading,
    LoadingController,
    ToastController,
    AlertOptions,
    PopoverController,
    Label
} from "ionic-angular";
import { Injectable } from "@angular/core";
import { AlertInputOptions } from "ionic-angular/components/alert/alert-options";
import { MyApp } from "../app/app.component";
import { JsBridgeUtil } from "./utils/jsbridge.util";

/**
 * Ui相关服务类
 */
@Injectable()
export class UiService {
    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private popoverCtrl: PopoverController) {
    }

    /**
     * 显示进度条
     * @param message     进度条文字
     * @returns {Loading}
     */
    public showLoading(message?: string): Loading {
        let loading = this.loadingCtrl.create();
        loading.setContent(message).present();
        return loading;
    }

    /**
     * 显示Toast
     * @param message       toast文字
     * @param duration      停留时间 默认2秒
     * @param position      显示位置 默认底部
     * @returns {Toast}
     */
    public showToast(message: string, duration?: number, position?: 'top' | 'middle' | 'bottom') {
        if (MyApp.ISTELCHINA) {
            JsBridgeUtil.toast(message, duration);
        } else {
            let toast = this.toastCtrl.create();
            if (!duration) {
                duration = 2000;
            }

            if (!position) {
                position = "bottom";
            }
            toast.setMessage(message).setDuration(duration).setPosition(position).present();
        }
    }

    /**
     * 显示ActionSheet
     * @param arrText       文字数组
     * @param callback      回调,回传选中的位置和label
     * @param title         标题
     * @returns {ActionSheet}
     */
    public showActionSheet(arrText: string[], callback?: (number, string) => void, title?: string): ActionSheet {
        let actionSheet = this.actionSheetCtrl.create();

        if (title) {
            actionSheet.setTitle(title);
        }

        for (let i = 0; i < arrText.length; i++) {
            let optionButton = {} as ActionSheetButton;
            optionButton.text = arrText[i];
            optionButton.cssClass = 'z-actionsheet-button';
            optionButton.handler = () => {
                if (callback) {
                    callback(i, arrText[i]);
                }
            };
            actionSheet.addButton(optionButton)
        }

        actionSheet.present();
        return actionSheet;
    }

    /**
     * 显示Aler
     * @param title         标题
     * @param content       内容
     * @param callback      回调
     * @returns {Alert}
     */
    public showAlert(title?: string, content?: string, callback?: () => void): Alert {
        let alert = this.alertCtrl.create();
        alert.setTitle(title)
            .setMessage(content)
            .addButton({
                text: '确定',
                handler: () => {
                    if (callback) {
                        callback();
                    }
                }
            })
            .present();
        return alert;
    }

    /**
     * 显示Confirm
     * @param title             标题
     * @param content           内容
     * @param okCallback        确定按钮回调
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     * @returns {Alert}
     */
    public showConfirm(title?: string, content?: string, okCallback?: () => void, cancelCallback?: () => void, OkBtnText?: string, cancelBtnText?: string): Alert {
        let alert = this.alertCtrl.create();
        alert.setTitle(title)
            .setMessage(content)
            .addButton({
                text: cancelBtnText ? cancelBtnText : '取消',
                role: 'cancel',
                handler: () => {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                }
            })
            .addButton({
                text: OkBtnText ? OkBtnText : '确定',
                handler: () => {
                    if (okCallback) {
                        okCallback();
                    }
                }
            })
            .present();
        return alert;
    }


    /**
     * 显示CheckboxDialog
     * @param title             标题
     * @param arrText           内容
     * @param selectedPos       默认选中的
     * @param okCallback        确定按钮回调, 回传position和label数组
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public showCheckboxDialog(title?: string, arrText?: string[], selectedPos?: number[], okCallback?: (sel: Array<{ index: number, label: string }>) => void, cancelCallback?: () => void, OkBtnText?: string, cancelBtnText?: string): Alert {
        let checkedValue: Array<{ index: number, label: string }> = [];
        let option = {} as AlertOptions;
        option.inputs = [];
        option.title = title;
        option.buttons = [
            {
                text: cancelBtnText ? cancelBtnText : '取消',
                role: 'cancel',
                handler: () => {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                }
            },
            {
                text: OkBtnText ? OkBtnText : '确定',
                handler: () => {
                    if (okCallback) {
                        for (let index = 0; index < option.inputs.length; index++) {
                            const element = option.inputs[index];
                            if (element.checked) {
                                checkedValue.push({ index: index, label: element.label });
                            }
                        }
                        okCallback(checkedValue);
                    }
                }
            }
        ];

        for (let i = 0; i < arrText.length; i++) {
            let inputOption = {} as AlertInputOptions;
            inputOption.label = arrText[i];
            inputOption.type = "checkbox";
            inputOption.checked = selectedPos ? selectedPos.indexOf(i) >= 0 : false;
            option.inputs.push(inputOption)
        }

        let alert = this.alertCtrl.create(option);
        alert.present();
        return alert;
    }



    /**
     * 显示RadioboxDialog
     * @param title             标题
     * @param arrText           内容
     * @param selectedPos       默认选中的
     * @param okCallback        确定按钮回调, 回传position和label
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public showRadioboxDialog(title?: string, arrText?: string[], selectedPos?: number, okCallback?: (number, string) => void, cancelCallback?: () => void, OkBtnText?: string, cancelBtnText?: string): Alert {
        let option = {} as AlertOptions;
        option.inputs = [];
        option.title = title;
        option.buttons = [
            {
                text: cancelBtnText ? cancelBtnText : '取消',
                role: 'cancel',
                handler: () => {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                }
            },
            {
                text: OkBtnText ? OkBtnText : '确定',
                handler: () => {
                    for (let index = 0; index < option.inputs.length; index++) {
                        const element = option.inputs[index];
                        if (element.checked) {
                            if (okCallback) {
                                okCallback(index, element.label);
                            }
                            break;
                        }
                    }
                }
            }
        ];

        for (let i = 0; i < arrText.length; i++) {
            let inputOption = {} as AlertInputOptions;
            inputOption.label = arrText[i];
            inputOption.type = "radio";
            inputOption.checked = selectedPos >= 0 ? selectedPos == i : false;
            option.inputs.push(inputOption)
        }

        let alert = this.alertCtrl.create(option);
        alert.present();
        return alert;
    }

    /**
     * 显示单选下拉框
     * @param event         触发事件
     * @param arrText       备选文字
     * @param selectedPos   默认选中项
     * @param okCallback    选中回调
     */
    public showSelect(arrText?: string[], selectedPos?: number, okCallback?: (number, string) => void) {
        let popover = this.popoverCtrl.create('SelectPage', { texts: arrText, selectPos: [selectedPos] });
        popover.onDidDismiss(data => {
            if (data) {
                okCallback(data.selectedPos, data.selectedText);
            }
        });
        popover.present();
    }

    /**
     * 显示多选下拉框
     * @param event         触发事件
     * @param arrText       备选文字
     * @param selectedPos   默认选中项
     * @param okCallback    点解确定回调
     * @param isAddAll      是否增加‘全部’
     * @param isAllSelected 是否选中‘全部’
     * @param allText       ‘全部’按钮的文字描述
     */
    public showMultiSelect(arrText?: string[], selectedPos?: number[], okCallback?: (selectedPos: number[], selectedText: string[], isAllSelected: boolean) => void, isAddAll?: boolean, isAllSelected?: boolean, allText?: string) {
        let popover = this.popoverCtrl.create('SelectPage', { texts: arrText, selectPos: selectedPos, isMulti: true, isAddAll: isAddAll, isAllSelected: isAllSelected, allText: allText });
        popover.onDidDismiss(data => {
            if (data) {
                okCallback(data.selectedPos, data.selectedText, isAllSelected);
            }
        });
        popover.present();
    }
}
