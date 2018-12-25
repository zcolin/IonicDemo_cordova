/**
 * Http 请求参数类
 */
export class ZHttpError extends Error {
    constructor(public code: number, public message: string) {
        super(message);
    }
}

