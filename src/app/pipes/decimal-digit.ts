/*
 * *********************************************************
 *   author   chenchaung
 *   company  telchina
 *   email    tyrad@qq.com
 *   date     2018-09-07 09:01:03
 * ********************************************************
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'decimalDigit',
})
/**
 * 保留小数位数  如:{{entStatics.annualrevenue   | decimalDigit }} / {{entStatics.annualrevenue   | decimalDigit:2 }}
 */
export class DecimalDigitPipe implements PipeTransform {

    /**
     * 保留小数位数
     * @param {number} value
     * @param {number} precision 保留的小数位数,默认小数点后2位
     * @param {number} divideBy  除以某个数
     * @returns {string}
     */
    transform(value: number, precision: number = 2, divideBy: number = 1) {
        return (value / divideBy).toFixed(precision);
    }
}
