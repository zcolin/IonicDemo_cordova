import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-external-web-view',
    templateUrl: './external-web-view.page.html',
    styleUrls: ['./external-web-view.page.scss'],
})
export class ExternalWebViewPage implements OnInit {
    isLoaded = false;  // 网页是否被加载
    progressObj: HTMLElement;   // 进度条对象
    progress = 0;       // 网页访问的进度条
    secUrl: SafeResourceUrl;    // 安全链接
    microAppCall;
    @Input() url;
    @Input() title;
    @Input() finishCallback: () => void;

    constructor(private sanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
        if (this.url) {
            this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        }
    }

    ionViewDidLoad() {
        this.load();
        this.microAppCall = (e) => { // 接收iframe中发送过来的数据
            if (e.data.msgType == 'refresh') {
                this.load();
            } else if (e.data.msgType == 'close' && this.finishCallback) {
                this.finishCallback();
            }
        };
        window.addEventListener('message', this.microAppCall);

        this.progressObj = this.progressObj || document.getElementById('progress');
        this.onprogress();
    }

    ionViewDidLeave() {
        window.removeEventListener('message', this.microAppCall);
    }

    back() {
        if (this.finishCallback) {
            this.finishCallback();
        }
    }

    /**
     *  加载页面
     */
    load() {
        const title = this.title;
        const url = this.secUrl;
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
        const timeout = this.random(10, 30); // 随机时间
        const timer = setTimeout(() => {
            if (this.isLoaded) {
                this.progressObj.style.width = '100%';
                clearTimeout(timer);
                return;
            }

            this.progress += this.random(1, 5); // 随机进度

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
