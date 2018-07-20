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
        return value == undefined || (typeof value === 'number' && isNaN(value)) ;
    }
    /**
     * Url是否合法
     * @param value
     */
    static isValidateUrl(value): boolean {
        let v = new RegExp('^((https|http|ftp|rtsp|mms)?://)'
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
            + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.'" // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
        if (v.test(value)) {
            return true;
        } else {
            return false;
        }
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
