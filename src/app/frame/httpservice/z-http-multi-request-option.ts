import {ZHttpOption} from './z-http-option';

/**
 * 多个合并请求参数
 */
export interface ZHttpMultiRequestOption {
    option: ZHttpOption<any>[]; // 单个请求参数数组
    isHideLoading?: boolean;    // 是否显示进度条
    loadingMsg?: string;        // 进度条信息
}
