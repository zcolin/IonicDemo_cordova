import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root: any = 'HomePage';
    tab2Root: any = 'EchartsPage';
    tab3Root: any = 'JsBridgePage';
    tab4Root: any = 'CordovaPage';
    tab5Root: any = 'ArcgisPage';
    tab6Root: any = 'AMapPage';

    tab1Title = "Home";
    tab2Title = "Echarts";
    tab3Title = "JSBridge";
    tab4Title = "Cordova";
    tab5Title = "Arcgis";
    tab6Title: any = 'AMap';

    constructor(public navCtrl: NavController) {

    }
}
