/**
 * 本地存储工具类
 */
export class ZStorageUtil {

    public static get(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            const value = window.localStorage.getItem(key);
            resolve(value);
        });
    }

    public static setArray(key_values: { key: string, value: string }[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (key_values) {
                key_values.forEach(({key, value}, index) => {
                    window.localStorage.setItem(key, value);
                });
            }
            resolve();
        });
    }

    public static set(key: string, value: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.localStorage.setItem(key, value);
            resolve();
        });
    }

    public static remove(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.localStorage.removeItem(key);
            resolve();
        });
    }

    public static clear(): Promise<any> {
        return new Promise((resolve, reject) => {
            window.localStorage.clear();
            resolve();
        });
    }

    public static forEach(): Promise<(element: any) => void> {
        return new Promise((resolve, reject) => {
            const callback = (element) => {
            };
            window.localStorage.forEach(callback);
            resolve(callback);
        });
    }
}
