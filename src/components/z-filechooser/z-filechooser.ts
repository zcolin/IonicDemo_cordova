import { Component, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../providers/ui.service';
import { Util } from '../../providers/utils/util';
import { Observable } from 'rxjs';
import { ImageUtil } from '../../providers/utils/image.util';
import {Loading} from "ionic-angular";

@Component({
    selector: 'z-filechooser',
    templateUrl: 'z-filechooser.html'
})
export class ZFilechooserComponent {
    @Input() width: string;
    @Input() height: string;
    @Input() toSize: number;
    @Input() showProgress;
    @Output() fileSelected = new EventEmitter<string[]>();

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

            this.loadFiles(files).subscribe((imagesSrc) => {
                if (this.toSize) {
                    ImageUtil.compressImages(imagesSrc, this.toSize).subscribe((compressSrc) => {
                        this.fileSelected.emit(compressSrc);
                        if (loading) {
                            loading.dismiss();
                        }
                    });
                } else {
                    this.fileSelected.emit(imagesSrc);
                    if (loading) {
                        loading.dismiss();
                    }
                }
            });
        }
    }

    private loadFiles(files): Observable<string[]> {
        return new Observable(observer => {
            let imagesSrc: string[] = [];
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                let fileReader = new FileReader();
                fileReader.onload = (e: Event) => {
                    let content = (e.target as any).result;
                    imagesSrc.push(content);

                    /*最后一条加载完成后，回调完成*/
                    if (index == files.length - 1) {
                        observer.next(imagesSrc)
                    }
                };

                fileReader.onerror = ((ev: Event) => {
                    observer.next(imagesSrc)
                });

                fileReader.onabort = ((ev: Event) => {
                    observer.next(imagesSrc)
                });

                fileReader.readAsDataURL(file);
            }
        });
    }
}
