
/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:53
 * ********************************************************
 */

/**
 * Http 请求参数类
 */
export class ZHttpError extends Error {
    constructor(public code: number, public message: string) {
        super(message);
    }
}

