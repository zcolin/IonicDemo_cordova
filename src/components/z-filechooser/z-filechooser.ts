/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:48
 * ********************************************************
 */

import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {UiService} from '../../providers/ui.service';
import {Util} from '../../providers/utils/util';
import {Observable} from 'rxjs';
import {ImageUtil} from '../../providers/utils/image.util';
import {Loading} from "ionic-angular";
import {ZFileEntity} from "./zfile.entity";

declare let EXIF: any;

/**
 * 文件选择控件
 */
@Component({
    selector: 'z-filechooser',
    templateUrl: 'z-filechooser.html'
})
export class ZFilechooserComponent {
    @Input() width: string;
    @Input() height: string;
    @Input() toSize: number;
    @Input() showProgress;
    @Input() addEXIF: boolean;
    @Output() fileSelected = new EventEmitter<ZFileEntity[]>();

    @ViewChild("input") input: ElementRef;

    constructor(private renderer: Renderer2, private uiService: UiService) {
    }

    /**
     * 动态增加是否多选，默认单选
     */
    @Input() set multiple(multiple: boolean) {
        if (multiple) {
            this.renderer.setAttribute(this.input.nativeElement, "multiple", "multiple");
        } else {
            this.renderer.removeAttribute(this.input.nativeElement, "multiple");
        }
    }

    onFileChange(event) {
        let files = event.target.files;
        if (files && files.length > 0) {
            let loading: Loading;
            if (Util.isValid(this.showProgress)) {
                loading = this.uiService.showLoading();
            }
            this.loadFiles(files)
                .flatMap(value => this.addExifs(value))
                .flatMap(value => this.compress(value))
                .subscribe((imageEntities) => {
                    this.fileSelected.emit(imageEntities);
                    if (loading) {
                        loading.dismiss();
                    }
                    this.clear();
                });
        }
    }

    clear() {
        this.input.nativeElement.value = '';
    }

    /**
     * 加载多个文件
     * @param files
     */
    private loadFiles(files): Observable<ZFileEntity[]> {
        let obArray: Observable<any>[] = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            obArray.push(this.loadFile(file));
        }
        return Observable.forkJoin(...obArray);
    }

    /**
     * 加载单个文件
     * @param file
     */
    private loadFile(file): Observable<ZFileEntity> {
        let fileReader = new FileReader();
        return Observable.create(observer => {
            fileReader.onload = (e: Event) => {
                let entity = new ZFileEntity();
                entity.content = (e.target as any).result;
                entity.name = file.name;
                entity.type = file.type;
                entity.file = file;
                observer.next(entity);
                observer.complete();
            };

            fileReader.onerror = ((ev: Event) => {
                observer.error();
            });
            fileReader.onabort = ((ev: Event) => {
                observer.error();
            });
            fileReader.readAsDataURL(file);
        });
    }

    /**
     * 多个文件添加exif信息
     * @param {ZFileEntity[]} imageEntities
     */
    private addExifs(imageEntities: ZFileEntity[]): Observable<ZFileEntity[]> {
        if (Util.isValid(this.addEXIF) && imageEntities && imageEntities.length > 0) {
            let obArray: Observable<any>[] = [];
            for (let index = 0; index < imageEntities.length; index++) {
                const imageEntitie = imageEntities[index];
                obArray.push(this.addExif(imageEntitie));
            }
            return Observable.forkJoin(...obArray);
        } else {
            return Observable.create(observer => imageEntities);//直接返回
        }
    }

    /**
     * 单个文件添加exif信息
     * @param imageEntity
     */
    private addExif(imageEntity: ZFileEntity): Observable<ZFileEntity> {
        let fileReader = new FileReader();
        return Observable.create(observer => {
            fileReader.onload = (e: Event) => {
                imageEntity.exif = EXIF.readFromBinaryFile((e.target as any).result);
                observer.next(imageEntity);
                observer.complete();
            };

            fileReader.onerror = ((ev: Event) => {
                observer.error();
            });

            fileReader.onabort = ((ev: Event) => {
                observer.error();
            });
            fileReader.readAsArrayBuffer(imageEntity.file);
        });
    }

    /**
     * 压缩文件
     * @param {ZFileEntity[]} imageEntity
     * @returns {Observable<ZFileEntity[]>}
     */
    private compress(imageEntity: ZFileEntity[]): Observable<ZFileEntity[]> {
        if (this.toSize) {
            return ImageUtil.compressImages(imageEntity.map((value => value.content)), this.toSize, imageEntity.map(value => value.type)).map(src => {
                for (let i = 0; i < src.length; i++) {
                    imageEntity[i].content = src[i];
                }
                return imageEntity;
            });
        } else {
            return Observable.create(imageEntity);
        }
    }
}
