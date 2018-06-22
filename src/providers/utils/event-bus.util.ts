import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StringUtil } from './string.util';

/**
 * 事件总线的Service
 */
@Injectable()
export class EventBusUtil {
    private static eventBus: Subject<any> = new Subject<string>();

    constructor() { }

    /**
     * 发送命令消息
     * @param msgType  全局唯一的字符串命令代号 
     * @param value    传值
     */
    public static publish(msgType: string, value?: any) {
        this.eventBus.next({ msgType: msgType, value: value });
    }

    /**
     * 订阅消息
     * @param msgType  全局唯一的字符串命令代号 
     * @param method   回调函数
     */
    public static subscribe(msgType: string, method: (value) => void) {
        this.eventBus.subscribe((value) => {
            if (!StringUtil.isEmpty(msgType) && msgType === value.msgType) {
                method(value.value);
            }
        });
    }
}