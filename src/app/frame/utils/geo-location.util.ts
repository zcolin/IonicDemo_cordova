import {Injectable} from '@angular/core';
import {ZUtil} from './z.util';
import {ZLogUtil} from './z-log.util';

/**
 * 定位服务
 */
@Injectable()
export class GeolocationUtil {
    constructor() {
    }

    /**
     * HTML5 Geolocation（地理定位）定位用户的位置
     * 1.位置服务用于估计您所在位置的本地网络信息包括：有关可见 WiFi 接入点的信息（包括信号强度）、有关您本地路由器的信息、您计算机的 IP 地址。位置服务的准确度和覆盖范围因位置不同而异。
     * 2.总的来说，在PC的浏览器中 HTML5 的地理位置功能获取的位置精度不够高，如果借助这个 HTML5 特性做一个城市天气预报是绰绰有余，但如果是做一个地图应用，那误差还是太大了。
     * 3.不过，如果是移动设备上的 HTML5 应用，可以通过设置 enableHighAcuracy 参数为 true，调用设备的 GPS 定位来获取高精度的地理位置信息。
     *
     * @param onLocation        成功回调
     * @param onError           失败回调
     * @param retryTime         重试次数
     */
    static getGeolocation(onLocation: (position: Position) => void, onError?: (error: string) => void, retryTime?: number): void {
        retryTime = ZUtil.isValid(retryTime) ? retryTime : 3;
        if (navigator.geolocation) {
            this.location(onLocation, onError, retryTime, 0);
        } else {
            if (onError) {
                onError('定位服务不可用');
            }
        }
    }

    /**
     * 定位，带重试次数
     * @param onLocation        成功回调
     * @param onError           失败回调
     * @param retryTime         重试次数
     * @param times             当前重试次数
     */
    private static location(onLocation: (position: Position) => void, onError: (error: string) => void, retryTime: number, times: number) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                onLocation(position);
                // this.latitude = position.coords.latitude;
                // this.longitude = position.coords.longitude;
            },
            (err) => {
                times++;
                if (times > retryTime) {
                    if (onError) {
                        onError(this.getError(err));
                    }
                } else {
                    this.location(onLocation, onError, retryTime, times); // 定位失败并且没有超过重试次数，则重新定位
                }
            },
            {
                enableHighAccuracy: true, // true获取高精度的位置，默认为false
                timeout: 12000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                maximumAge: 3000// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
            });
    }

    /**
     * 监听地理位置变化
     * watchPosition() - 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）。
     * clearWatch() - 停止 watchPosition() 方法
     * 下面的例子展示 watchPosition() 方法。您需要一台精确的 GPS 设备来测试该例（比如 iPhone）：
     */
    static watchPosition(onLocation: (position: Position) => void, onError: (error: string) => void): number {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
                (position) => {
                    onLocation(position);
                },
                (err) => {
                    if (onError) {
                        onError(this.getError(err));
                    }
                },
                {
                    enableHighAccuracy: true, // true获取高精度的位置，默认为false
                    timeout: 12000,           // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                    maximumAge: 3000         // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                });
            return id;
        } else {
            ZLogUtil.log('不支持定位');
        }
        return null;
    }

    /**
     * 停止监控定位
     * @param watchId
     */
    static stopWatchPosition(watchId: number) {
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchId);
        }
    }

    static getError(error) {
        switch (error.code) {
            case error.TIMEOUT:
                return '定位超时，请稍候重试！';
            case error.POSITION_UNAVAILABLE:
                return '暂时无法获取位置,请稍候重试！';
            case error.PERMISSION_DENIED:
                return '请授予定位权限！';
            default:
                return '未知错误';
        }
    }
}
