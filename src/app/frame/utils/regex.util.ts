/**
 * 正则匹配工具类
 */
export class RegexUtil {

    /**
     * Url是否合法
     * @param value
     */
    static isUrl(value): boolean {
        const regStr = '^((https|http|ftp|rtsp|mms)?://)'
            + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' // ftp的user@
            + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + '([0-9a-z_!~*\'()-]+\.)*' // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.\'' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
        const v = new RegExp(regStr);
        return v.test(value);
    }

    /**
     * 电话是否合法
     * @param value
     */
    static isPhone(value) {
        return this.isMobile(value) || this.isPlane(value);
    }

    /**
     * 手机是否合法
     * @param value
     */
    static isMobile(value): boolean {
        return /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/.test(value);
    }

    /**
     * 座机是否合法
     * @param value
     */
    static isPlane(value): boolean {
        return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value);
    }
}

