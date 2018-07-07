import { Observable } from "rxjs";

/**
 * 图片相关的工具类
 */
export class ImageUtil {
    /**
     * 等比压缩多张图片
     * @param minPixel          最小像素，如1920*1080， 输入mixPixel =100，则返回177.7*100像素的图片
     * @param quality           压缩质量
     * @param compressComplete  压缩完回调，返回base64图片 
     */
    static compressImages(imgScr: string[], minPixel: number, quality?: number): Observable<string[]> {
        return new Observable(observer => {
            quality = quality || 0.95;
            quality = quality > 1 ? 1 : quality;
            quality = quality < 0 ? 0.95 : quality;
            let compressSrc: string[] = [];
            for (let index = 0; index < imgScr.length; index++) {
                const data = imgScr[index];
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
                    let base64 = canvas.toDataURL('image/jpeg', quality);
                    compressSrc.push(base64);

                    /*最后一条加载完成后，回调完成*/
                    if (index == imgScr.length - 1) {
                        observer.next(compressSrc)
                    }
                }
                img.onerror = () => {
                    observer.next(null)
                }
            }
        });
    }

    /**
     * 等比压缩单张图片
     * @param minPixel          最小像素，如1920*1080， 输入mixPixel =100，则返回177.7*100像素的图片
     * @param quality           压缩质量
     * @param compressComplete  压缩完回调，返回base64图片 
     */
    static compressImage(imgScr: string, minPixel: number, quality?: number): Observable<string> {
        return new Observable(observer => {
            quality = quality || 0.95;
            quality = quality > 1 ? 1 : quality;
            quality = quality < 0 ? 0.95 : quality;
            let img = new Image();
            img.src = imgScr;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                let w = Math.max(img.naturalWidth, img.naturalHeight);
                let h = Math.min(img.naturalWidth, img.naturalHeight);
                let scale = h / minPixel;
                canvas.width = w / scale;
                canvas.height = minPixel;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                let base64 = canvas.toDataURL('image/jpeg', quality);
                observer.next(base64)
            }
            img.onerror = () => {
                observer.next(null)
            }
        });
    }
}
