import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ZBannerEntity} from './z-banner-entity';
import {IonSlides} from '@ionic/angular';

/**
 * 轮播图
 */
@Component({
    selector: 'z-banner',
    templateUrl: 'z-banner.html',
    styleUrls: ['z-banner.scss']
})
export class ZBannerComponent implements OnInit, OnChanges {
    @Output() bannerClick: EventEmitter<number> = new EventEmitter<number>();
    @Input() picData: ZBannerEntity[] = []; // 图片实体
    @Input() width = '100%';        // 宽度
    @Input() height = '56vw';       // 高度
    @Input() autoPlay = true;       // 自动播放
    @Input() loopTime = 4000;       // 轮播时间
    @Input() loop = true;           // 循环播放
    @Input() options;               // 轮播参数，参考文档
    @Input() backClick;             // 返回按钮点击
    @Input() showBack;              // 是否显示返回按钮
    @Input() paginationPositionLeft;   // 分页器位置
    @Input() paginationPositionTop;    // 分页器位置
    @Input() paginationPositionBottom; // 分页器位置
    @Input() paginationPositionRight;  // 分页器位置

    cusOptions;                     // 本组件使用它的options\

    @ViewChild('zbanner') slides: IonSlides;
    currentPage = 1;
    totalPage = 0;

    constructor() {
        this.paginationPositionLeft = 'auto';
        this.paginationPositionTop = 'auto';
        this.paginationPositionBottom = '0px';
        this.paginationPositionRight = '0px';
    }

    ngOnInit() {
        this.totalPage = this.picData.length;
        this.setOptions();
    }

    ngOnChanges(changes) {
        this.totalPage = this.picData.length;
        if (changes.autoplay || changes.loop || changes.pagination) {
            this.setOptions();
        }
    }

    private setOptions() {
        this.cusOptions = this.options ? this.options : {
            autoplay: this.autoPlay ? {delay: this.loopTime, disableOnInteraction: false} : false,
            loop: this.loop,
            pagination: {el: '.swiper-pagination', type: null},
        };
    }

    /**
     * 点击图片跳转
     */
    async jumpBanner() {
        let index = await this.slides.getActiveIndex();
        if (this.picData && this.picData.length > 0) {
            if (index > this.picData.length) {
                index = 0;
            } else if (index > 0) {
                index = index - 1;
            }
            this.bannerClick.emit(index);
        }
    }

    async slideChange() {
        this.currentPage = await this.slides.getActiveIndex();
    }

    onBackButtonClick() {
        if (this.backClick) {
            this.backClick();
        }
    }
}
