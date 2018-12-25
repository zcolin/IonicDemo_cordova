/**
 * 新闻数据返回实体
 */
export class PoisReply {
    count: number;
    pois: PoiItem[];
}

export class PoiItem {
    id: string;
    name: string;
    type: string;
    address: string;
    adname: string;
    picUrl: string;
}
