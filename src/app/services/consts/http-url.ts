/**
 * URL常量类
 */
export class HttpUrl {
    public static URL_NEWS = 'http://restapi.amap.com/v3/place/text?key=ac472e992680b96b54a41edcfbd9325b&keywords' +
        '=北京大学&types=高等院校&city=北京&children=1&offset=20&extensions=all&page=';

    public static URL_BASE = 'http://10.10.61.29:8080/gxnn/platform/mobile/';

    /**
     * 重新设置静态变量
     * @param baseUrl
     */
    public static setBaseUrl(baseUrl: string) {
        if (baseUrl) {
            for (const key in HttpUrl) {
                if (HttpUrl.hasOwnProperty(key) && typeof HttpUrl[key] == 'string' && key !== 'URL_BASE') {
                    HttpUrl[key] = HttpUrl[key].replace(HttpUrl.URL_BASE, baseUrl);
                }
            }
            HttpUrl.URL_BASE = baseUrl;
        }
    }
}







