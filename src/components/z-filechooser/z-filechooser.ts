import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {UiService} from '../../providers/ui.service';
import {Util} from '../../providers/utils/util';
import {Observable} from 'rxjs';
import {ImageUtil} from '../../providers/utils/image.util';
import {Loading} from "ionic-angular";
import {ZFileEntity} from "./zfile.entity";

@Component({
    selector: 'z-filechooser',
    templateUrl: 'z-filechooser.html'
})
export class ZFilechooserComponent {
    @Input() width: string;
    @Input() height: string;
    @Input() toSize: number;
    @Input() showProgress;
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

            this.loadFiles(files).subscribe((imageEntities) => {
                if (this.toSize) {
                    ImageUtil.compressImages(imageEntities.map(value => value.content), this.toSize, imageEntities.map(value => value.type)).subscribe((compressSrc) => {
                        for (let i = 0; i < compressSrc.length; i++) {
                            imageEntities[i].content = compressSrc[i];
                        }
                        this.fileSelected.emit(imageEntities);
                        if (loading) {
                            loading.dismiss();
                        }
                    });
                } else {
                    this.fileSelected.emit(imageEntities);
                    if (loading) {
                        loading.dismiss();
                    }
                }
                this.clear();
            });
        }
    }

    clear() {
        this.input.nativeElement.value = '';
    }

    private loadFiles(files): Observable<ZFileEntity[]> {
        return new Observable(observer => {
            let imageEntities: ZFileEntity[] = [];
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                let fileReader = new FileReader();
                fileReader.onload = (e: Event) => {
                    let entity = new ZFileEntity();
                    entity.content = (e.target as any).result;
                    entity.name = file.name;
                    entity.type = file.type;
                    entity.file = file;
                    imageEntities.push(entity);

                    /*最后一条加载完成后，回调完成*/
                    if (index == files.length - 1) {
                        observer.next(imageEntities)
                    }
                };

                fileReader.onerror = ((ev: Event) => {
                    observer.next(imageEntities)
                });

                fileReader.onabort = ((ev: Event) => {
                    observer.next(imageEntities)
                });

                fileReader.readAsDataURL(file);
            }
        });
    }
}
