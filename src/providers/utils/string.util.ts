/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午1:01
 * ********************************************************
 */

/**
 * 字符串相关工具类
 */
export class StringUtil {

    /**
     * 字符串是否为空
     * @param value
     */
    static isEmpty(value: any): boolean {
        return value == null || (typeof value === 'string' && value.length === 0);
    }

    /**
     * 字符串非空
     * @param value
     */
    static isNotEmpty(value: any): boolean {
        return !this.isEmpty(value);
    }
}
