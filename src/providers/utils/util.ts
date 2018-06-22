/**
 * Utils类存放和业务无关的公共方法
 */
export class Util {
    /**
     * 是否是可用字段，不是undefinde、null、NaN
     * @param value
     */
    static isValid(value: any): boolean {
        return !(value == undefined || value == null || isNaN(value));
    }

    /**
     * 值是否未定义
     * @param value 
     */
    static isUndefinde(value: any): boolean {
        return value == undefined || isNaN(value);
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
}
