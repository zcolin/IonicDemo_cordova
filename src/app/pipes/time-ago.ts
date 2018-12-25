import {Pipe, PipeTransform} from '@angular/core';
import {DateUtil} from '../frame/utils/date.util';

@Pipe({
    name: 'timeAgo',
})
/**
 * 获取时间用..以前的形式
 * @param pTime
 */
export class TimeAgoPipe implements PipeTransform {

    transform(value: string, ...args) {
        return DateUtil.getTimeAgo(new Date(value));
    }
}
