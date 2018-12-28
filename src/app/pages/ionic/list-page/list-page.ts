import {Component, Input, OnInit} from '@angular/core';
import {PoiItem, PoisReply} from '../../../models/pois-reply';
import {ZHttpService} from '../../../frame/httpservice/z-http.service';
import {ZUtil} from '../../../frame/utils/z.util';
import {HttpUrl} from '../../../services/consts/http-url';
import {ZHttpOption} from '../../../frame/httpservice/z-http-option';
import {ZUiService} from '../../../frame/services/z-ui.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'page-list-page',
    templateUrl: 'list-page.html',
    styleUrls: ['list-page.scss']
})
export class ListPage implements OnInit {
    totalCount: number;
    listPoi: PoiItem[] = [];
    page = 1;
    @Input() finishCallback: () => void;

    constructor(public router: Router, public route: ActivatedRoute, private http: ZHttpService, private uiService: ZUiService) {
    }

    ngOnInit() {
        this.doRefresh();
    }

    goback() {
        if (this.finishCallback) {
            this.finishCallback();
        } else {
            this.router.navigate(['../'], {relativeTo: this.route});
        }
    }

    doRefresh(event?) {
        this.page = 1;
        this.requestData(event);
    }

    doInfinite(event) {
        if (ZUtil.isValid(this.totalCount) && this.listPoi.length >= this.totalCount) {
            this.uiService.showToast('已加载全部');
            event.target.complete();
        } else {
            this.requestData(null, event);
        }
    }

    requestData(eventRefresher?, eventScroller?) {
        const option: ZHttpOption<PoisReply> = {
            zreply: {
                isSuccess: (code) => code == '1',
                msgKey: 'info',
                codeKey: 'status',
                // dataKey: 'pois',              //服务器返回信息字段
            },
            isHideLoading: true,
        };

        this.http.get<PoisReply>(HttpUrl.URL_NEWS + this.page, option, {
            success: (reply) => {
                this.totalCount = reply.count;
                if (reply.pois && reply.pois.length > 0) {
                    if (this.page == 1) {
                        this.listPoi = reply.pois;
                    } else {
                        this.listPoi.push(...reply.pois);
                    }
                    this.listPoi.forEach((item) => item.picUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530199012840&di=f170d4e6699af3ae778d89b190af9880&imgtype=0&src=http%3A%2F%2Fpic.lvmama.com%2Fuploads%2Fpc%2Fplace2%2F2015-09-10%2F5179c540-f333-40c4-a95a-c36732d623d8_1280_.jpg');
                }
                this.page++;
            },
            complete: () => {
                if (eventRefresher) {
                    eventRefresher.target.complete();
                }
                if (eventScroller) {
                    eventScroller.target.complete();
                }
            }
        });
    }
}
