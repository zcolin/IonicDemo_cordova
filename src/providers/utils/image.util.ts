/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午1:01
 * ********************************************************
 */

import {Observable} from "rxjs";

/**
 * 图片相关的工具类
 */
export class ImageUtil {

    /**
     * 等比压缩多张图片
     * @param imageSrc          图片文件
     * @param minPixel          最小像素，如1920*1080， 输入mixPixel =100，则返回177.7*100像素的图片
     * @param imgType           图片类型，默认jpg
     * @param quality           压缩质量
     */
    static compressImages(imageSrc: string[], minPixel: number, imgType: string[], quality?: number): Observable<string[]> {
        return new Observable(observer => {
            quality = quality || 0.95;
            quality = quality > 1 ? 1 : quality;
            quality = quality < 0 ? 0.95 : quality;
            let compressSrc: string[] = [];
            for (let index = 0; index < imageSrc.length; index++) {
                const data = imageSrc[index];
                let img = new Image();
                img.src = data;
                img.onload = () => {
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    let b = img.naturalWidth > img.naturalHeight;
                    let scale = b ? img.naturalHeight / minPixel : img.naturalWidth / minPixel;//取较小的尺寸除以需要的尺寸
                    canvas.width = b ? img.naturalWidth / scale : minPixel;
                    canvas.height = b ? minPixel : img.naturalHeight / scale;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    let base64 = canvas.toDataURL(imgType[index] || 'image/jpeg', quality);
                    compressSrc.push(base64);

                    /*最后一条加载完成后，回调完成*/
                    if (index == imageSrc.length - 1) {
                        observer.next(compressSrc);
                        observer.complete();
                    }
                };
                img.onerror = () => {
                    observer.next(null);
                    observer.error();
                }
            }
        });
    }

    /**
     * 等比压缩单张图片
     * @param imageSrc
     * @param minPixel          最小像素，如1920*1080， 输入mixPixel =100，则返回177.7*100像素的图片
     * @param quality           压缩质量
     * @param imgType           图片类型，默认jpg
     */
    static compressImage(imageSrc: string, minPixel: number, imgType: string, quality?: number): Observable<string> {
        return new Observable(observer => {
            quality = quality || 0.95;
            quality = quality > 1 ? 1 : quality;
            quality = quality < 0 ? 0.95 : quality;
            let img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                let w = Math.max(img.naturalWidth, img.naturalHeight);
                let h = Math.min(img.naturalWidth, img.naturalHeight);
                let scale = h / minPixel;
                canvas.width = w / scale;
                canvas.height = minPixel;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                let base64 = canvas.toDataURL(imgType || 'image/jpeg', quality);
                observer.next(base64);
                observer.complete();
            };
            img.onerror = () => {
                observer.next(null);
                observer.error();
            }
        });
    }
}
