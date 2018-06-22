import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UiService } from '../../providers/ui.service';
import { Dialogs } from '@ionic-native/dialogs';

@IonicPage()
@Component({
    selector: 'page-cordova',
    templateUrl: 'cordova.html'
})
export class CordovaPage {

    constructor(public navCtrl: NavController, private camera: Camera, private dialogs: Dialogs, private uiService: UiService) {

    }

    addPicture() {
        const options: CameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        // 获取图片
        this.camera.getPicture(options).then((imageData) => {
            // 获取成功
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.uiService.showToast(base64Image);
        }, (err) => {
            this.uiService.showToast(err);
        });
    }

    showDialog() {
        this.dialogs.alert('Hello world')
            .then(() => console.log('Dialog dismissed'))
            .catch(e => console.log('Error displaying dialog', e));
    }

}
