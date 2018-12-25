/**
 * 日志工具类
 */
export class ZLogUtil {
    static DEBUG = true;

    static log(message?: any, ...optionalParams: any[]): void {
        if (ZLogUtil.DEBUG) {
            console.log(message, optionalParams);
        }
    }

    static error(message?: any, ...optionalParams: any[]): void {
        if (ZLogUtil.DEBUG) {
            console.error(message, optionalParams);
        }
    }

    static warn(message?: any, ...optionalParams: any[]): void {
        if (ZLogUtil.DEBUG) {
            console.warn(message, optionalParams);
        }
    }

    static clear(): void {
        if (ZLogUtil.DEBUG) {
            console.clear();
        }
    }
}
