import {Component} from '@angular/core';
import {en_US} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'app-ant-date-picker',
    templateUrl: './ant-date-picker.page.html',
    styleUrls: ['./ant-date-picker.page.scss'],
})
export class AntDatePickerPage {
    locale = en_US;
    name1 = '选择';
    name2 = '选择';
    name3 = '选择';
    name4 = '选择';

    nowTimeStamp = Date.now();
    now = new Date(this.nowTimeStamp);
    utcNow = new Date(this.now.getTime() + this.now.getTimezoneOffset() * 60000);

    value = [];
    value1 = new Date();
    value2 = new Date();
    value3 = new Date();
    value4 = this.utcNow;

    currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
        const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
        return format
        .replace('yyyy', date.getFullYear())
        .replace('mm', pad(date.getMonth() + 1))
        .replace('dd', pad(date.getDate()))
        .replace('HH', pad(date.getHours()))
        .replace('MM', pad(date.getMinutes()))
        .replace('ss', pad(date.getSeconds()));
    }

    onOk1(result: Date) {
        this.name1 = this.currentDateFormat(result);
        this.value1 = result;
    }

    onOk2(result) {
        this.name2 = this.currentDateFormat(result, 'yyyy-mm-dd');
        this.value2 = result;
    }

    onOk3(result) {
        this.name3 = this.formatIt(result, 'HH:mm');
        this.value3 = result;
    }

    onOk4(result) {
        this.name4 = this.formatIt(result, 'HH:mm');
        this.value4 = result;
    }

    onValueChange(result) {
        this.name1 = this.currentDateFormat(result);
        this.value1 = result;
    }

    formatIt(date: Date, form: string) {
        const pad = (n: number) => (n < 10 ? `0${n}` : n);
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        if (form === 'YYYY-MM-DD') {
            return dateStr;
        }
        if (form === 'HH:mm') {
            return timeStr;
        }
        return `${dateStr} ${timeStr}`;
    }
}
