import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@IonicPage()
@Component({
    selector: 'page-external-web',
    templateUrl: 'external-web.html',
})
export class ExternalWebPage {
    isLoaded: boolean = false;  // 网页是否被加载
    progressObj: HTMLElement;   // 进度条对象
    progress: number = 0;       // 网页访问的进度条
    secUrl: SafeResourceUrl;    // 安全链接
    title: string;
    microAppCall;
    constructor(public navCtrl: NavController, private params: NavParams, private sanitizer: DomSanitizer) {
        let url = this.params.get('url');
        this.title = params.get('title');
        if (url) {
            this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    }

    ionViewDidLoad() {
        this.load();
        this.microAppCall = (e) => { // 接收iframe中发送过来的数据
            if (e.data.msgType == 'refresh') {
                this.load();
            } else if (e.data.msgType == 'close') {
                this.navCtrl.pop();
            }
        };
        window.addEventListener('message', this.microAppCall);

        this.progressObj = this.progressObj || document.getElementById('progress');
        this.onprogress();
    }

    ionViewDidLeave() {
        window.removeEventListener('message', this.microAppCall);
    }

    /**
     *  加载页面
     */
    load() {
        let title = this.title;
        let url = this.secUrl;
        this.title = '加载中';
        this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
        setTimeout(() => {
            this.isLoaded = false;
            this.progress = 0;
            this.progressObj = this.progressObj || document.getElementById('progress');
            this.onprogress();
            this.title = title;
            this.secUrl = url;
        }, 10);
    }

    // 生成随机数
    private random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * 网页访问进度
     */
    private onprogress() {
        let timeout = this.random(10, 30);// 随机时间
        let timer = setTimeout(() => {
            if (this.isLoaded) {
                this.progressObj.style.width = '100%';
                clearTimeout(timer);
                return;
            }

            this.progress += this.random(1, 5);// 随机进度

            // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
            if (this.progress > 90) {
                this.progress = 90;
            }

            this.progressObj.style.width = this.progress + '%';
            this.onprogress();
        }, timeout);
    }

    // 如果iframe页面加载成功后
    loaded() {
        this.isLoaded = true;
    }
}
