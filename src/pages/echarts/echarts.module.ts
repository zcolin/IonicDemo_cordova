import { EchartsPage } from './echarts';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';

@IonicPage()
@NgModule({
  declarations: [
    EchartsPage,
  ],
  imports: [
    IonicPageModule.forChild(EchartsPage),
  ],
  exports: [
    EchartsPage
  ]
})
export class EchartsPageModule { }

