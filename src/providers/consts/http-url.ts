/**
 * URL常量类
 */
export class HttpUrl {
    public static URL_BASE = "http://10.10.61.29:8080/gxnn/platform/mobile/"; //默认
    public static URL_LOGIN = HttpUrl.URL_BASE + "login/doLogin";
    public static URL_CHAR_TYPE_DATA = HttpUrl.URL_BASE + "economic/getCategoryList";
    public static URL_CHAR_DATA = HttpUrl.URL_BASE + "economic/getCategoryItem";
    public static URL_COUNTY_CHART = HttpUrl.URL_BASE + "economic/getCountyDetail";
    public static URL_INDICATOR = HttpUrl.URL_BASE + "economic/getIndexData";
    public static URL_INDICTOR_WARNING = HttpUrl.URL_BASE + "economic/getWarningAnalysis";
    public static URL_PROJECT_TYPE = HttpUrl.URL_BASE + "projectInfo/getAnalyseAaliber";
    public static URL_PROJECT_NANNING_DATA = HttpUrl.URL_BASE + "projectInfo/getCityProjectAnalyse";
    public static URL_PROJECT_COUNTY_DATA = HttpUrl.URL_BASE + "projectInfo/getCountyProjectAnalyse";
    public static URL_INVESTCARRIER_BUSINESSTYPE=HttpUrl.URL_BASE+"investcarrier/getBusinessTypeList";
    public static URL_INVESTCARRIER_INVITBUSINESS=HttpUrl.URL_BASE+"investcarrier/getInvitBusiness";
    public static URL_BUILDINGECONOMIC_GETTYPELIST=HttpUrl.URL_BASE+"buildingeconomy/getTypeList";
    public static URL_BUILDINGECONOMIC_GETBUILDINGANALYSE=HttpUrl.URL_BASE+"buildingeconomy/getBuildingAnalyse";
    public static URL_INDUSTRY_GETTYPELIST=HttpUrl.URL_BASE+"industry/getTypeList";
    public static URL_INDUSTRY_GETWHOLELIST=HttpUrl.URL_BASE+"industry/getWholeList"
    public static URL_INDUSTRY_GETANALYSEBYAREA=HttpUrl.URL_BASE+"industry/getAnalyseByArea"
    public static URL_INDUSTRY_GETANALYSEBYINDUSTRY=HttpUrl.URL_BASE+"industry/getAnalyseByIndustry";
    public static URL_INDUSTRY_GETANALYSEBYYEAR=HttpUrl.URL_BASE+"industry/getAnalyseByYear";
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







