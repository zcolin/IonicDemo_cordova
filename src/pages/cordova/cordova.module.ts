import { CordovaPage } from './cordova';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Dialogs } from '@ionic-native/dialogs';
import { ComponentsModule } from '../../components/components.module';
import { ActionSheet } from '@ionic-native/action-sheet';
import { DatePicker } from '@ionic-native/date-picker';
import { Device } from '@ionic-native/device';
import { FileChooser } from '@ionic-native/file-chooser';
import { Toast } from '@ionic-native/toast';

@NgModule({
    declarations: [
        CordovaPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(CordovaPage),
    ],
    exports: [
        CordovaPage
    ],
    providers: [
        Dialogs,
        Camera,
        ActionSheet,
        DatePicker,
        Device,
        FileChooser,
        Toast,
    ]
})
export class CordovaPageModule { }
