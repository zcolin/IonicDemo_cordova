import {Component} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {HttpUrl} from './services/consts/http-url';
import {JsBridgeUtil} from './frame/jsbridge/jsbridge.util';
import {BrowserUtil} from './frame/utils/browser.util';
import {ZUtil} from './frame/utils/z.util';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ZLogUtil} from './frame/utils/z-log.util';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    statusBarClass: string;

    constructor(public platform: Platform, public navCtrl: NavController, private router: Router, private location: Location) {
        platform.ready().then(() => {
            // 沉浸式
            // this.statusBarClass = BrowserUtil.isTelchina() && BrowserUtil.isAndroid(platform) ? 'statusbar-md' : (BrowserUtil.isIos(platform) ? (BrowserUtil.isIphoneX() ? 'statusbar-ios-iphonex' : 'statusbar-ios') : 'statusbar-browser');
            try {
                const baseUrl = ZUtil.getQueryParam('baseUrl');
                if (baseUrl) {
                    HttpUrl.setBaseUrl(baseUrl);
                }

                const strParams = ZUtil.getQueryParam('params');
                const params = strParams ? JSON.parse(decodeURIComponent(strParams)) : null;

                const pageName = ZUtil.getQueryParam('pageName');
                if (pageName) {
                    console.log(pageName);
                    this.navCtrl.navigateRoot(pageName, {queryParams: params});
                }
            } catch (error) {
                console.log(error);
            }

            this.registerBackButtonAction(); // 注册返回按键事件
        });
    }

    // 混合模式注册goback监听
    registerBackButtonAction() {
        const platformStr = BrowserUtil.isAndroid(this.platform) ? 'android' : BrowserUtil.isIos(this.platform) ? 'ios' : null;
        JsBridgeUtil.registerGoBack(platformStr, (data, responseCallback) => {
            const result = this.goBack();
            responseCallback(JSON.stringify({result: result}));
        });

        // Cordova模式注册goback监听
        // this.platform.registerBackButtonAction(() => {
        //     if (!this.goBack()) {
        //         if (this.isCanExit) { //当触发标志为true时，即2秒内双击返回按键则退出APP
        //             this.platform.exitApp();
        //         } else {
        //             this.uiService.showToast('再按一次退出应用');
        //             this.isCanExit = true;
        //             setTimeout(() => this.isCanExit = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
        //         }
        //     }
        // }, 1);
    }

    /**
     * android端调用的返回事件
     */
    goBack(): boolean {
        // const loadingPortal = this.ionicApp._loadingPortal.getActive();
        // if (loadingPortal) {
        //     return true;
        // }
        //
        // /*modal 或者遮罩*/
        // const activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._overlayPortal.getActive();
        // if (activePortal) {
        //     activePortal.dismiss();
        //     return true;
        // }
        ZLogUtil.log(this.router.url);
        if (this.router.url !== '/tabs/tab-ui') {
            this.location.back();
            return true;
        }
        return false;
    }
}
