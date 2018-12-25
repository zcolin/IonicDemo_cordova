/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:52
 * ********************************************************
 */

import {Pipe, PipeTransform} from '@angular/core';
import {DateUtil} from '../frame/utils/date.util';

@Pipe({
    name: 'zDate',
})
/**
 * 日期格式转换
 */
export class ZDatePipe implements PipeTransform {

    // safari不支持MM-dd-yyyy的格式,先进行替换. 有可能返回的是时间戳，如果是时间戳，直接使用
    transform(value: any, args: string) {
        args = args || 'yyyy-MM-dd HH:mm';
        const num = Number(value);
        return num && num > 0 ? DateUtil.getDateStr(new Date(num * 1000), args) : typeof value == 'string' && value ? value : null;
    }
}
