import {Observable} from 'rxjs';

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
            const compressSrc: string[] = [];
            for (let index = 0; index < imageSrc.length; index++) {
                const data = imageSrc[index];
                const img = new Image();
                img.src = data;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const b = img.naturalWidth > img.naturalHeight;
                    const scale = b ? img.naturalHeight / minPixel : img.naturalWidth / minPixel; // 取较小的尺寸除以需要的尺寸
                    canvas.width = b ? img.naturalWidth / scale : minPixel;
                    canvas.height = b ? minPixel : img.naturalHeight / scale;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const base64 = canvas.toDataURL(imgType[index] || 'image/jpeg', quality);
                    compressSrc.push(base64);

                    /*最后一条加载完成后，回调完成*/
                    if (index === imageSrc.length - 1) {
                        observer.next(compressSrc);
                        observer.complete();
                    }
                };
                img.onerror = () => {
                    observer.next(null);
                    observer.error();
                };
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
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const w = Math.max(img.naturalWidth, img.naturalHeight);
                const h = Math.min(img.naturalWidth, img.naturalHeight);
                const scale = h / minPixel;
                canvas.width = w / scale;
                canvas.height = minPixel;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const base64 = canvas.toDataURL(imgType || 'image/jpeg', quality);
                observer.next(base64);
                observer.complete();
            };
            img.onerror = () => {
                observer.next(null);
                observer.error();
            };
        });
    }
}
