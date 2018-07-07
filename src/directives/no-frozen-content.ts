import { Directive } from "@angular/core";
import { Content, Platform } from "ionic-angular";
import { BrowserUtil } from "../providers/utils/browser.util";

@Directive({
    selector: '[no-frozen-content]',
})

/**
 * 解决ios不能滚动的问题
 */
export class NoFrozenContent {
    constructor(private content: Content, private platform: Platform) {
    }

    ngOnInit() {
        if (BrowserUtil.isIos(this.platform)) {
            const scrollElement = this.content.getScrollElement();
            if (scrollElement && scrollElement.scrollTo) {
                scrollElement.scrollTo(0, 1);
                this.content.ionScrollEnd.subscribe(evt => {
                    if ((this.content.contentHeight + 1) < scrollElement.scrollHeight) {
                        if (scrollElement.scrollTop === 0) {
                            scrollElement.scrollTo(0, 1);
                        } else if ((scrollElement.scrollTop + this.content.contentHeight) === scrollElement.scrollHeight) {
                            scrollElement.scrollTo(0, (scrollElement.scrollTop - 1));
                        }
                    };
                });
            }
        }
    }
}
