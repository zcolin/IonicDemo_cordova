import {BaseLayer} from './BaseLayer';
import {loadModules} from 'esri-loader';

/**
 * 天地图底图
 */
export class TiandituBaseLayer extends BaseLayer {

    scale = [2.958293554545656E8, 1.479146777272828E8, 7.39573388636414E7, 3.69786694318207E7, 1.848933471591035E7, 9244667.357955175, 4622333.678977588,
        2311166.839488794, 1155583.419744397, 577791.7098721985, 288895.85493609926, 144447.92746804963, 72223.96373402482, 36111.98186701241, 18055.990933506204, 9027.995466753102,
        4513.997733376551, 2256.998866688275];
    resolution = [0.7031249999891485, 0.35156249999999994, 0.17578124999999997, 0.08789062500000014, 0.04394531250000007, 0.021972656250000007, 0.01098632812500002,
        0.00549316406250001, 0.0027465820312500017, 0.0013732910156250009, 0.000686645507812499, 0.0003433227539062495, 0.00017166137695312503, 0.00008583068847656251,
        0.000042915344238281406, 0.000021457672119140645, 0.000010728836059570307, 0.000005364418029785169];

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
            const spatialReference = new SpatialReference({wkid: 4326});
            const tileInfo = new TileInfo({
                'size': 256,
                'dpi': 96,
                'origin': {'x': -180, 'y': 90},
                'compressionQuality': 0,
                'spatialReference': spatialReference,
                'format': 'png24',
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
                            urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=vec_c&X={col}&Y={row}&L={level}&tk=b5ca85bce62f83611e5b4135f4fe1bc5',
                            subDomains: ['t1', 't2', 't3', 't4', 't5'],
                        }),
                    new WebTileLayer({
                        urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cva_c&X={col}&Y={row}&L={level}&tk=b5ca85bce62f83611e5b4135f4fe1bc5',
                        subDomains: ['t1', 't2', 't3', 't4', 't5'],
                    })
                ],
                spatialReference: spatialReference,
                title: '街道地图',
                id: 'basemap_vec',
                thumbnailUrl: '../../assets/imgs/basemap_vec.png',
                tileInfo: tileInfo,
                fullExtent: new Extent(-180, -90, 180, 90),
            });

            const basemapImg = new Basemap({
                baseLayers: [
                    new WebTileLayer(
                        {
                            urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=img_c&X={col}&Y={row}&L={level}',
                            subDomains: ['t1', 't2', 't3', 't4', 't5'],
                        }),
                    new WebTileLayer({
                        urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cia_c&X={col}&Y={row}&L={level}',
                        subDomains: ['t1', 't2', 't3', 't4', 't5'],
                    })
                ],
                spatialReference: spatialReference,
                title: '影像地图',
                id: 'basemap_img',
                thumbnailUrl: '../../assets/imgs/basemap_img.png',
                tileInfo: tileInfo,
                fullExtent: new Extent(-180, -90, 180, 90),
            });
            return [baseLayerVec, basemapImg];
        });
    }

    getMaxZoom() {
        return this.scale.length - 1;
    }

    getMinZoom() {
        return 1;
    }
}
