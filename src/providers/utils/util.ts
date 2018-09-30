/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午1:01
 * ********************************************************
 */

/**
 * Utils类存放和业务无关的公共方法
 */
export class Util {

    /**
     * 是否是可用字段，不是undefinde、null、NaN
     * @param value
     */
    static isValid(value: any): boolean {
        return !((typeof value === 'number' && isNaN(value)) || value == undefined || value == null);
    }

    /**
     * 值是否未定义
     * @param value
     */
    static isUndefinde(value: any): boolean {
        return value == undefined || (typeof value === 'number' && isNaN(value));
    }

    /**
     * 获取url传入的参数
     * @param key
     */
    static getQueryParam(key: string): string {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == key) {
                return pair[1];
            }
        }
        return "";
    }

    /**
     * 去掉所有的html标记
     * @param {string} str
     * @returns {string}
     */
    static delHtmlTag(str: string) {
        str = str.replace(/(\n)/g, "");
        str = str.replace(/(\t)/g, "");
        str = str.replace(/(\r)/g, "");
        str = str.replace(/<\/?[^>]*>/g, "");
        str = str.replace(/\s*/g, "");
        str = str.replace(/&nbsp;/ig, ''); //去掉nbsp
        str = str.replace(/&npsp;/ig, ''); //去掉nbsp
        return str;
    }
}

