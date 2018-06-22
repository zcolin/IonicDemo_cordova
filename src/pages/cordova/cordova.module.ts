import { CordovaPage } from './cordova';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    CordovaPage,
  ],
  imports: [
    IonicPageModule.forChild(CordovaPage),
  ],
  exports: [
    CordovaPage
  ]
})
export class CordovaPageModule { }
