import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UiService } from '../../providers/ui.service';
import { Dialogs } from '@ionic-native/dialogs';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker';
import { Device } from '@ionic-native/device';
import { FileChooser } from '@ionic-native/file-chooser';
import { Toast } from '@ionic-native/toast';

declare let ImagePicker: any;
@IonicPage()
@Component({
    selector: 'page-cordova',
    templateUrl: 'cordova.html'
})
export class CordovaPage {
    base64Image: string[] = [];
    constructor(
        public navCtrl: NavController,
        private camera: Camera,
        private dialogs: Dialogs,
        private uiService: UiService,
        private actionSheet: ActionSheet,
        private datePicker: DatePicker,
        private device: Device,
        private fileChooser: FileChooser,
        private toast: Toast,
         ) {

    }

    showCamera() {
        const options: CameraOptions = {
            quality: 100,//Default is 50
            sourceType: this.camera.PictureSourceType.CAMERA,//Default is CAMERA
            destinationType: this.camera.DestinationType.DATA_URL,//Default is FILE_URI.DATA_URL
            encodingType: this.camera.EncodingType.JPEG,//Default is JPEG
            mediaType: this.camera.MediaType.PICTURE,//PHOTOLIBRARY or SAVEDPHOTOALBUM时有效
            targetWidth: 300,
            targetHeight: 300,
        }
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = [];
            this.base64Image.push('data:image/jpeg;base64,' + imageData);
        }, err => console.log(err));
    }

    showImagePickerGithub() {
        ImagePicker.getPictures(
            result => {
                this.base64Image = [];
                let images = result.images;
                for (let i = 0; i < images.length; i++) {
                    this.base64Image.push(images[i].path);
                }
            },
            err => console.log(err),
            {
                maximumImagesCount: 9,
                width: -1,
                height: -1,
                quality: 100
            });
    }
    showDialog(text?: string) {
        this.dialogs.alert(text || 'Hello world')
            .then(() => console.log('Dialog dismissed'))
            .catch(err => console.log(err));
    }

    showActionSheet() {
        let buttonLabels = ['分享到微信好友', '分享到微信朋友圈'];
        const options: ActionSheetOptions = {
            title: '选择操作',
            subtitle: 'Choose an action',
            buttonLabels: buttonLabels,
            addCancelButtonWithLabel: '取消',
            addDestructiveButtonWithLabel: '删除',
            androidTheme: 5,
            destructiveButtonLast: true
        };

        this.actionSheet.show(options).then((buttonIndex: number) => {
            this.uiService.showToast('Button pressed: ' + buttonIndex);
        });
    }

    showDatePicker(mode?: string) {
        const options: DatePickerOptions = {
            date: new Date(),
            mode: mode || 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        };

        this.datePicker.show(options).then(
            date => this.uiService.showToast(date.toString()),
            err => console.log(err)
        );
    }

    showDeviceInfo() {
        let str: string = '';
        str += 'cordova' + ':' + this.device.cordova + '\n';
        str += 'model' + ':' + this.device.model + '\n';
        str += 'platform' + ':' + this.device.platform + '\n';
        str += 'uuid' + ':' + this.device.uuid + '\n';
        str += 'version' + ':' + this.device.version + '\n';
        str += 'manufacturer' + ':' + this.device.manufacturer + '\n';
        str += 'isVirtual' + ':' + this.device.isVirtual + '\n';
        str += 'serial' + ':' + this.device.serial + '\n';

        this.showDialog(str);
    }

    showFileChooer() {
        this.fileChooser.open()
            .then(uri => this.showDialog(uri))
            .catch(e => console.log(e));
    }

    showToast() {
        this.toast.show(`I'm a toast`, '2000', 'bottom').subscribe(
            toast => {
                console.log(toast);
            }
        );
    }
}
