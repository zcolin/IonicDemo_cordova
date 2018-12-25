export abstract class BaseLayer {
    /**
     * 获取影像底图地址数组列表
     */
    abstract getBaseMaps(): Promise<any[]>;

    /**
     * 获取最大缩放比
     */
    abstract getMaxZoom(): number;

    /**
     * 获取最小缩放比
     */
    abstract getMinZoom(): number;
}