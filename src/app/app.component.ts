import {IonicApp, Keyboard} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { BrowserUtil } from '../providers/utils/browser.util';
import { HttpUrl } from '../providers/consts/http-url';
import { UiService } from '../providers/ui.service';
import { Util } from '../providers/utils/util';
import { JsBridgeUtil } from '../providers/jsbridge/jsbridge.util';
import {TabsPage} from "../pages/tabs/tabs";

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
    constructor(public platform: Platform, private ionicApp: IonicApp, private uiService: UiService, public keyboard: Keyboard) {
        platform.ready().then(() => {
            try {
                MyApp.ISTELCHINA = BrowserUtil.isTelchina(navigator.userAgent);
                MyApp.ISANDROID = BrowserUtil.isAndroid(this.platform);
                MyApp.ISIOS = BrowserUtil.isIos(this.platform);
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

     //混合模式注册goback监听
    registerBackButtonAction() {
        JsBridgeUtil.registerGoBack((data, responseCallback) => {
            let result = this.goBack();
            responseCallback(JSON.stringify({ result: result }));
        });

        //Cordova模式注册goback监听
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
        if (this.keyboard.isOpen()) {
            this.keyboard.close();
            return true;
        }

        let loadingPortal = this.ionicApp._loadingPortal.getActive();
        if (loadingPortal) {
            return true;
        }

        /*modal 或者遮罩*/
        let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._overlayPortal.getActive();
        if (activePortal) {
            activePortal.dismiss();
            return true;
        }

        //tabs直接push了页面
        if (this.nav.canGoBack()) {
            this.nav.pop();
            return true;
        }

        //tabs内嵌页面的子页面
        const childNavs = this.nav.getActiveChildNavs();
        if (!childNavs || childNavs.length == 0) {
            if (this.nav.canGoBack()) {//普通页面
                this.nav.pop();
                return true;
            }
            return false;
        }

        //tabs页面
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
