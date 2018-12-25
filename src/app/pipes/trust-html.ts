/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-8-24 上午10:06
 * ********************************************************
 */

import {DomSanitizer} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';

/**
 * 内嵌html必须调用此管道，否则编译报错
 */
@Pipe({
    name: 'trustHtml',
})
export class TrustHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(val: string, args: string): any {
        return val ? this.sanitizer.bypassSecurityTrustHtml(val) : val;
    }
}
