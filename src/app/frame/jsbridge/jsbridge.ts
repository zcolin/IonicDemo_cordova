export class JsBridge {
    constructor() {
    }

    /**
     * 注册jsbridge监听
     * @param methodName    注册接口方法名称
     * @param plaform       平台类型
     * @param callback      被调用后执行回调，可携带参数返回原生端
     */
    registerHandler(methodName: string, plaform: 'android' | 'ios' | null, callback: (data: string, responseCallback: (returnData: string) => void) => void) {
        this.setupWebViewJavascriptBridge((bridge) => {
            bridge.registerHandler(methodName, callback);
        }, plaform);
    }

    /**
     * 调用原生方法
     * @param methodName    接口方法名称
     * @param data          传输数据
     * @param callback      调用完成回调，包含原生端返回的参数
     */
    callHandler(methodName: string, data?: string, callback?: (returnData: string) => void): boolean {
        data = (data === undefined || data == null) ? '' : data;
        callback = callback ? callback : (responseData) => {
        };
        if (window['WebViewJavascriptBridge']) {
            window['WebViewJavascriptBridge'].callHandler(methodName, data, callback);
            return true;
        }
        return false;
    }

    private setupWebViewJavascriptBridge(callback: (param: any) => void, platform?: string) {
        if (window['WebViewJavascriptBridge']) {
            return callback(window['WebViewJavascriptBridge']);
        }

        if (!platform || platform === 'android') {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                () => {
                    callback(window['WebViewJavascriptBridge']);
                },
                false
            );
        }

        if (!platform || platform === 'ios') {
            if (window['WVJBCallbacks']) {
                return window['WVJBCallbacks'].push(callback);
            }

            window['WVJBCallbacks'] = [callback];
            const WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => {
                document.documentElement.removeChild(WVJBIframe);
            }, 0);
        }
    }
}
