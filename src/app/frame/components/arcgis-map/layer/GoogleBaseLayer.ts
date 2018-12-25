import {BaseLayer} from './BaseLayer';
import {loadModules} from 'esri-loader';

/**
 * 谷歌底图
 */
export class GoogleBaseLayer extends BaseLayer {
    scale = [591657527.591555, 295828763.795777, 147914381.897889, 73957190.948944, 36978595.474472, 18489297.737236, 9244648.868618,
        4622324.434309, 2311162.217155, 1155581.108577, 577790.554289, 288895.277144, 144447.638572, 72223.819286,
        36111.9096437, 18055.9548224, 9027.977411, 4513.988705, 2256.994353, 1128.497176];
    resolution = [156543.033928, 78271.5169639999, 39135.7584820001, 19567.8792409999, 9783.93962049996, 4891.96981024998, 2445.98490512499,
        1222.99245256249, 611.49622628138, 305.748113140558, 152.874056570411, 76.4370282850732, 38.2185141425366, 19.1092570712683, 9.55462853563415,
        4.77731426794937, 2.38865713397468, 1.19432856685505, 0.597164283559817, 0.298582141647617];

    public getBaseMaps(): Promise<any[]> {
        return loadModules([
            'esri/Basemap',
            'esri/layers/WebTileLayer',
            'esri/geometry/SpatialReference',
            'esri/layers/support/TileInfo',
            'esri/geometry/Point',
            'esri/geometry/Extent',
            'dojo/domReady!'
        ]).then(([Basemap, WebTileLayer, SpatialReference, TileInfo, Point, Extent]) => {
            const spatialReference = new SpatialReference({wkid: 3857});
            const tileInfo = new TileInfo({
                'size': 256,
                'dpi': 96,
                'compressionQuality': 0,
                'spatialReference': spatialReference,
                'origin': {'x': -20037508.3427892, 'y': 20037508.3427892},
                'lods': [
                    {'level': 0, 'resolution': this.resolution[0], 'scale': this.scale[0]},
                    {'level': 1, 'resolution': this.resolution[1], 'scale': this.scale[1]},
                    {'level': 2, 'resolution': this.resolution[2], 'scale': this.scale[2]},
                    {'level': 3, 'resolution': this.resolution[3], 'scale': this.scale[3]},
                    {'level': 4, 'resolution': this.resolution[4], 'scale': this.scale[4]},
                    {'level': 5, 'resolution': this.resolution[5], 'scale': this.scale[5]},
                    {'level': 6, 'resolution': this.resolution[6], 'scale': this.scale[6]},
                    {'level': 7, 'resolution': this.resolution[7], 'scale': this.scale[7]},
                    {'level': 8, 'resolution': this.resolution[8], 'scale': this.scale[8]},
                    {'level': 9, 'resolution': this.resolution[9], 'scale': this.scale[9]},
                    {'level': 10, 'resolution': this.resolution[10], 'scale': this.scale[10]},
                    {'level': 11, 'resolution': this.resolution[11], 'scale': this.scale[11]},
                    {'level': 12, 'resolution': this.resolution[12], 'scale': this.scale[12]},
                    {'level': 13, 'resolution': this.resolution[13], 'scale': this.scale[13]},
                    {'level': 14, 'resolution': this.resolution[14], 'scale': this.scale[14]},
                    {'level': 15, 'resolution': this.resolution[15], 'scale': this.scale[15]},
                    {'level': 16, 'resolution': this.resolution[16], 'scale': this.scale[16]},
                    {'level': 17, 'resolution': this.resolution[17], 'scale': this.scale[17]},
                    {'level': 18, 'resolution': this.resolution[18], 'scale': this.scale[18]},
                    {'level': 19, 'resolution': this.resolution[19], 'scale': this.scale[19]}
                ],
            });

            const baseLayerVec = new Basemap({
                baseLayers: [
                    new WebTileLayer(
                        {
                            urlTemplate: 'http://mt{subDomain}.google.cn/vt/lyrs=m@212000000&hl=zh-CN&gl=CN&src=app&x={col}&y={row}&z={level}&s==Galil',
                            subDomains: ['1', '2', '3'],
                        }),
                    new WebTileLayer({
                        urlTemplate: 'http://mt{subDomain}.google.cn/vt/imgtp=png32&lyrs=h@212000000&hl=zh-CN&gl=CN&src=app&x={col}&y={row}&z={level}&s==Galil',
                        subDomains: ['1', '2', '3'],
                    })
                ],
                spatialReference: spatialReference,
                title: '街道地图',
                id: 'basemap_vec',
                thumbnailUrl: '../../assets/imgs/basemap_vec.png',
                tileInfo: tileInfo,
            });

            const basemapImg = new Basemap({
                baseLayers: [
                    new WebTileLayer(
                        {
                            urlTemplate: 'http://mt{subDomain}.google.cn/vt/lyrs=s@126&hl=zh-CN&gl=CN&src=app&x={col}&y={row}&z={level}&s==Galil',
                            subDomains: ['1', '2', '3'],
                        }),
                    new WebTileLayer({
                        urlTemplate: 'http://mt{subDomain}.google.cn/vt/imgtp=png32&lyrs=h@212000000&hl=zh-CN&gl=CN&src=app&x={col}&y={row}&z={level}&s==Galil',
                        subDomains: ['1', '2', '3'],
                    })
                ],
                spatialReference: spatialReference,
                title: '影像地图',
                id: 'basemap_img',
                thumbnailUrl: '../../assets/imgs/basemap_img.png',
                tileInfo: tileInfo,
            });
            return [baseLayerVec, basemapImg];
        });
    }

    getMaxZoom() {
        return this.scale.length - 2;
    }

    getMinZoom() {
        return 2;
    }
}
