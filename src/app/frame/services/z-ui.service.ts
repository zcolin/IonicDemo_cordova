import {ActionSheetController, AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {JsBridgeUtil} from '../jsbridge/jsbridge.util';
import {BrowserUtil} from '../utils/browser.util';

/**
 * Ui相关服务类
 */
@Injectable({
    providedIn: 'root'
})
export class ZUiService {
    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController) {
    }

    /**
     * 显示进度条
     * @param message     进度条文字
     * @returns {Loading}
     */
    public async showLoading(message?: string) {
        const loading = await this.loadingCtrl.create({
            message: message,
            spinner: 'circles',
        });
        await loading.present();
        return loading;
    }

    /**
     * 显示Toast,如果是自有环境，调用原生显示
     * @param message       toast文字
     * @param duration      停留时间 默认2秒
     * @param position      显示位置 默认底部
     */
    public async showToast(message: string, duration?: number, position?: 'top' | 'middle' | 'bottom') {
        if (BrowserUtil.isTelchina()) {
            JsBridgeUtil.toast(message, duration);
        } else {
            const toast = await this.toastCtrl.create({
                message: message,
                duration: duration ? duration : 2000,
                position: position ? position : 'bottom'
            });
            await toast.present();
        }
    }

    /**
     * 显示ActionSheet
     * @param arrText       文字数组
     * @param callback      回调,回传选中的位置和文字, 如果回调方法返回false，则弹出框不消失
     * @param header        标题
     */
    public async showActionSheet(arrText: string[], callback?: (number, string) => boolean | void, header?: string) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: header,
            buttons: arrText.map((value, index) => {
                return {
                    text: value,
                    cssClass: 'z-actionsheet-button',
                    handler: () => {
                        if (callback) {
                            return callback(index, value);
                        }
                    }
                };
            }),
        });
        await actionSheet.present();
        return actionSheet;
    }

    /**
     * 显示Alert
     * @param header   弹出框标题
     * @param content  弹出框内容
     * @param callback 如果回调方法返回false，则弹出框不消失
     * @param okText   确定按钮文字
     * @returns {Alert}
     */
    public async showAlert(header?: string, content?: string, callback?: () => void | boolean, okText?: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: content,
            buttons: [{
                text: okText || '确定',
                handler: () => {
                    if (callback) {
                        return callback();
                    }
                }
            }]
        });
        await alert.present();
        return alert;
    }

    /**
     * 显示Confirm
     * @param header            标题
     * @param content           内容
     * @param okCallback        确定按钮回调
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     * @returns {Alert}
     */
    public async showConfirm(header?: string, content?: string, okCallback?: () => boolean | void, cancelCallback?: () => boolean | void, OkBtnText?: string, cancelBtnText?: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: content,
            cssClass: 'th-app-alert',
            buttons: [
                {
                    text: cancelBtnText || '取消',
                    role: 'cancel',
                    handler: () => {
                        if (cancelCallback) {
                            return cancelCallback();
                        }
                    }
                },
                {
                    text: OkBtnText || '确定',
                    handler: () => {
                        if (okCallback) {
                            return okCallback();
                        }
                    }
                }
            ]
        });
        await alert.present();
        return alert;
    }

    /**
     * 显示CheckboxDialog
     * @param header            标题
     * @param arrText           内容
     * @param selectedPos       默认选中的
     * @param okCallback        确定按钮回调, 回传position和label数组
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public async showCheckboxDialog(header?: string, arrText?: string[], selectedPos?: number[], okCallback?: (sel: Array<{ index: number, label: string }>) => boolean | void,
        cancelCallback?: () => boolean | void, OkBtnText?: string, cancelBtnText?: string) {

        const inputs = [];
        for (let i = 0; i < arrText.length; i++) {
            inputs.push({label: arrText[i], type: 'checkbox', checked: selectedPos ? selectedPos.indexOf(i) >= 0 : false});
        }

        const alert = await this.alertCtrl.create({
            header: header,
            inputs: inputs,
            buttons: [
                {
                    text: cancelBtnText || '取消',
                    role: 'cancel',
                    handler: () => {
                        if (cancelCallback) {
                            return cancelCallback();
                        }
                    }
                },
                {
                    text: OkBtnText || '确定',
                    handler: () => {
                        if (okCallback) {
                            const checkedValue = inputs.filter(value => value.checked).map((value, index) => {
                                return {index: index, label: value.label};
                            });
                            return okCallback(checkedValue);
                        }
                    }
                }]
        });
        await alert.present();
        return alert;
    }

    /**
     * 显示RadioBoxDialog
     * @param header            标题
     * @param arrText           内容
     * @param selectedPos       默认选中的
     * @param okCallback        确定按钮回调, 回传position和label
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public async showRadioBoxDialog(header?: string, arrText?: string[], selectedPos?: number, okCallback?: (number, string) => boolean | void, cancelCallback?: () => boolean | void,
        OkBtnText?: string, cancelBtnText?: string) {

        const inputs = [];
        for (let i = 0; i < arrText.length; i++) {
            inputs.push({label: arrText[i], type: 'radio', checked: selectedPos >= 0 ? selectedPos === i : false});
        }

        const alert = await  this.alertCtrl.create({
            header: header,
            inputs: inputs,
            buttons: [
                {
                    text: cancelBtnText || '取消',
                    role: 'cancel',
                    handler: () => {
                        if (cancelCallback) {
                            return cancelCallback();
                        }
                    }
                },
                {
                    text: OkBtnText || '确定',
                    handler: () => {
                        if (okCallback) {
                            for (let index = 0; index < inputs.length; index++) {
                                const element = inputs[index];
                                if (element.checked) {
                                    return okCallback(index, element.label);
                                }
                            }
                        }
                    }
                }]
        });
        await  alert.present();
        return alert;
    }

    /**
     * 显示TextDialog
     * @param header             标题
     * @param okCallback        确定按钮回调, 回传position和label
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public async showTexDialog(header?: string, okCallback?: (string) => boolean | void, cancelCallback?: () => boolean | void, OkBtnText?: string, cancelBtnText?: string) {
        const inputs = [{
            name: 'remark',
            type: 'text'
        }];
        return this.showInputDialog(header, inputs, okCallback, cancelCallback, OkBtnText, cancelBtnText);
    }

    /**
     * 显示TextInputDialog
     * @param header            标题
     * @param inputs            AlterInput
     * @param okCallback        确定按钮回调, 回传position和label
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public async showInputDialog(header?: string, inputs?, okCallback?: ([]) => boolean | void, cancelCallback?: () => boolean | void, OkBtnText?: string, cancelBtnText?: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            inputs: inputs,
            buttons: [
                {
                    text: cancelBtnText || '取消',
                    role: 'cancel',
                    handler: () => {
                        if (cancelCallback) {
                            return cancelCallback();
                        }
                    }
                },
                {
                    text: OkBtnText || '确定',
                    handler: () => {
                        if (okCallback) {
                            return okCallback(inputs.map(value => value.value));
                        }
                    }
                }]
        });
        await alert.present();
        return alert;
    }
}
