import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Subscription} from 'rxjs/internal/Subscription';
import {ZStringUtil} from './z-string.util';

/**
 * 事件总线的Service
 */
@Injectable()
export class EventBusUtil {
    private static eventBus: Subject<any> = new Subject<string>();

    constructor() {
    }

    /**
     * 发送命令消息
     * @param msgType  全局唯一的字符串命令代号
     * @param value    传值
     */
    public static publish(msgType: any, value?: any) {
        this.eventBus.next({msgType: msgType, value: value});
    }

    /**
     * 订阅消息
     * @param msgType  全局唯一的字符串命令代号
     * @param method   回调函数
     */
    public static subscribe(msgType: any, method: (value) => void): Subscription {
        return this.eventBus.subscribe((value) => {
            if (!ZStringUtil.isEmpty(msgType) && msgType === value.msgType) {
                method(value.value);
            }
        });
    }

    /**
     * 订阅消息数组
     * @param {string[]} msgType{  全局唯一的字符串命令代号数组
     * 数组
     * @param method   回调函数
     */
    public static subscribeList(msgType: any[], method: (value) => void): Subscription {
        return this.eventBus.subscribe((value) => {
            msgType.forEach(data => {
                if (!ZStringUtil.isEmpty(msgType) && data === value.msgType) {
                    method(value.value);
                }
            });
        });
    }

    /**
     * 反订阅
     */
    public static unSubscribe(sub: Subscription) {
        if (sub) {
            sub.unsubscribe();
        }
    }
}
