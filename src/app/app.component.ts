import { IonicApp } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { BrowserUtil } from '../providers/utils/browser.util';
import { HttpUrl } from '../providers/consts/http-url';
import { UiService } from '../providers/ui.service';
import { Util } from '../providers/utils/util';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    public static TOKEN: string;//客户端请求的token
    public static ISTELCHINA: boolean;//是否是原生浏览器
    public static ISANDROID: boolean;//是否是安卓环境
    public static ISIOS: boolean;//是否是IOS环境
    public static PLATFORM: string;

    isCanExit: boolean = false;  //用于判断返回键是否触发
    constructor(public platform: Platform, private ionicApp: IonicApp, private uiService: UiService) {
        platform.ready().then(() => {
            try {
                MyApp.ISTELCHINA = BrowserUtil.isTelchina(navigator.userAgent);
                MyApp.ISANDROID = BrowserUtil.isAndroid(platform);
                MyApp.ISIOS = BrowserUtil.isIos(platform);
                MyApp.PLATFORM = MyApp.ISANDROID ? 'android' : MyApp.ISIOS ? 'ios' : null;
                //MyApp.TOKEN = Util.getQueryParam("token");
                MyApp.TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjY5NzcwOTQsImlhdCI6MTUyNjM3MjI5NH0.F7Xbb5MjQ1tiT7C0h5lOaKM8wRCcSyUkfAPy2MaJtc4';//暂时手动放入token，在pc端测试
                let pageName = Util.getQueryParam("pageName");
                let strParams = Util.getQueryParam("params");
                let baseUrl = Util.getQueryParam("baseUrl");
                HttpUrl.setBaseUrl(baseUrl);
                let params = strParams ? JSON.parse(decodeURIComponent(strParams)) : null;
                pageName = pageName || 'TabsPage';//不加参数默认为浏览器预览模式 EconomicTabsPage  ProjectTabsPage  MerchantPage
                this.nav.setRoot(pageName, params);
            } catch (error) {
                console.log(error);
            }

            this.registerBackButtonAction();//注册返回按键事件
        });
    }

    registerBackButtonAction() {

        //混合模式注册goback监听
        // JsBridgeUtil.registerGoBack((data, responseCallback) => {
        //     let result = this.goBack();
        //     responseCallback(JSON.stringify({ result: result }));
        // });

        //Cordova模式注册goback监听
        this.platform.registerBackButtonAction(() => {
            if (!this.goBack()) {
                if (this.isCanExit) { //当触发标志为true时，即2秒内双击返回按键则退出APP
                    this.platform.exitApp();
                } else {
                    this.uiService.showToast('再按一次退出应用');
                    this.isCanExit = true;
                    setTimeout(() => this.isCanExit = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
                }
            }
        }, 1);
    }

    /**
     * android端调用的返回事件
     */
    goBack(): boolean {
        if (this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()) {
            return true;
        }
        const activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._overlayPortal.getActive();
        if (activePortal) {
            activePortal.dismiss();
            return true;
        }
        const childNavs = this.nav.getActiveChildNavs();
        if (!childNavs || childNavs.length == 0) {
            return false;
        }

        for (const childNav of childNavs) {
            const tab = childNav.getSelected();  // 获取选中的tab
            const activeVC = tab.getActive();    // 通过当前选中的tab获取ViewController
            const activeNav = activeVC.getNav(); // 通过当前视图的ViewController获取的NavController
            if (activeNav.canGoBack()) {
                activeNav.pop();
                return true;
            }
        }
        return false;
    }

}
