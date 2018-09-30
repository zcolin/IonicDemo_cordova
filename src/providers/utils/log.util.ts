/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-8-29 下午5:34
 * ********************************************************
 */

/**
 * 日志工具类
 */
export class LogUtil {
    static DEBUG: boolean = true;

    static log(message?: any, ...optionalParams: any[]): void {
        if (LogUtil.DEBUG) {
            console.log(message, optionalParams);
        }
    }

    static error(message?: any, ...optionalParams: any[]): void {
        if (LogUtil.DEBUG) {
            console.error(message, optionalParams);
        }
    }

    static debug(message?: any, ...optionalParams: any[]): void {
        if (LogUtil.DEBUG) {
            console.debug(message, optionalParams);
        }
    }

    static info(message?: any, ...optionalParams: any[]): void {
        if (LogUtil.DEBUG) {
            console.info(message, optionalParams);
        }
    }

    static warn(message?: any, ...optionalParams: any[]): void {
        if (LogUtil.DEBUG) {
            console.warn(message, optionalParams);
        }
    }

    static clear(): void {
        if (LogUtil.DEBUG) {
            console.clear();
        }
    }
}
