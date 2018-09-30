/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:49
 * ********************************************************
 */

import {Directive} from "@angular/core";
import {Platform, Scroll} from "ionic-angular";
import {BrowserUtil} from "../providers/utils/browser.util";

/**
 * 解决ios不能滚动的问题
 */
@Directive({
    selector: '[no-frozen-scroll]',
})
export class NoFrozenScroll {
    constructor(private scroll: Scroll, private platform: Platform) {
    }

    ngOnInit() {
        if (BrowserUtil.isIos(this.platform)) {
            const scrollElement = this.scroll._scrollContent.nativeElement;
            if (scrollElement && scrollElement.scrollTo) {
                scrollElement.scrollTo(0, 1);
                this.scroll.addScrollEventListener(() => {
                    if ((scrollElement.clientHeight + 1) < scrollElement.scrollHeight) {
                        if (scrollElement.scrollTop === 0) {
                            scrollElement.scrollTo(0, 1);
                        } else if ((scrollElement.scrollTop + scrollElement.clientHeight) === scrollElement.scrollHeight) {
                            scrollElement.scrollTo(0, (scrollElement.scrollTop - 1));
                        }
                    }
                });
            }
        }
    }
}
