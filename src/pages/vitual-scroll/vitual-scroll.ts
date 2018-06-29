import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { HttpService } from '../../providers/httpservice/http.service';
import { HttpUrl } from '../../providers/consts/http-url';
import { ZHttpOption } from '../../providers/httpservice/zhttp-option';
import { PoiItem } from '../../models/poi-item';

@IonicPage()
@Component({
    selector: 'page-vitual-scroll',
    templateUrl: 'vitual-scroll.html',
})
export class VitualScrollPage {
    listPoi: PoiItem[] = [];
    page: number = 1;
    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private http: HttpService) {
    }

    ionViewDidLoad() {
        this.doRefresh();
    }

    doRefresh(refresher?: Refresher) {
        this.page = 1;
        this.requestData(refresher);
    }
    doInfinite(infiniteScroll?: InfiniteScroll) {
        this.requestData(null, infiniteScroll);
    }

    requestData(refresher?: Refresher, infiniteScroll?: InfiniteScroll) {
        let option: ZHttpOption = {
            zrepley: {
                isSuccess: (code) => code == "1",
                msgKey: 'info',
                codeKey: 'status',
                dataKey: 'pois',              //服务器返回信息字段
            },
            isHideLoading: true,
        }

        this.http.get<PoiItem[]>(HttpUrl.URL_NEWS + this.page, option, {
            success: (list) => {
                if (list && list.length > 0) {
                    if (this.page == 1) {
                        this.listPoi = list;
                    } else {
                        this.listPoi.push(...this.listPoi);
                    }
                    this.listPoi.forEach((item) => item.picUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530199012840&di=f170d4e6699af3ae778d89b190af9880&imgtype=0&src=http%3A%2F%2Fpic.lvmama.com%2Fuploads%2Fpc%2Fplace2%2F2015-09-10%2F5179c540-f333-40c4-a95a-c36732d623d8_1280_.jpg');
                }
                this.page++;
            },
            complete: () => {
                if (refresher) {
                    refresher.complete();
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            }
        });
    }

    openImg(index) {
        let photos = this.listPoi.map((value) => {
            return {
                url: value.picUrl,
            }
        });
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    }
}
