/*
 * *********************************************************
 *   author   colin
 *   company  telchina
 *   email    wanglin2046@126.com
 *   date     18-7-31 下午12:48
 * ********************************************************
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ZFileEntity} from "../z-filechooser/zfile.entity";
import {ModalController} from "ionic-angular";
import {GalleryModal} from "ionic-gallery-modal";
import {UiService} from "../../providers/ui.service";

/**
 * 图片分组选取控件
 */
@Component({
    selector: 'z-filechooser-group',
    templateUrl: 'z-filechooser-group.html'
})
export class ZFilechooserGroupComponent {
    @Input() maxNumber: number = 4;         //最大选择数
    @Input() isEditMode = true;             //是否是编辑模式，如果是编辑模式，则不显示移除按钮和添加图片按钮
    @Output() onFileChanged: EventEmitter<ZFileEntity[]> = new EventEmitter<ZFileEntity[]>(); //图片选择回调
    picList: ZFileEntity[] = [];             //图片实例集合
    addPicClose: boolean = true;             //是否显示添加图片，用于计算是否超过图片最大数量

    constructor(private modalCtrl: ModalController, private uiService: UiService) {
    }

    /**
     * 传入的是 url形式 如http://www.xxx.com/xxx.jpg, 此时会创建新的ZFileEntity, content是http://www.xxx.com/xxx.jpg，type是url。
     * @param {string[]} imageUrls
     */
    @Input() set imageUrls(imageUrls: string[]) {
        if (imageUrls && imageUrls.length > 0) {
            for (let i = 0; i < imageUrls.length; i++) {
                if (i < this.maxNumber) {
                    let fileEntity = new ZFileEntity();
                    fileEntity.content = imageUrls[i];
                    fileEntity.type = 'url';
                    this.picList.push(fileEntity);
                    this.addPicClose = i < this.maxNumber - 1;
                }
            }
        }
    }

    /**
     *  点击选择图片
     */
    onFileSelected(src: ZFileEntity[]) {
        for (let i = 0; i < src.length; i++) {
            this.addPicClose = true;
            this.picList.push(src[i]);
            if (this.picList.length >= this.maxNumber) {
                this.addPicClose = false;
                break;
            }
        }
        this.onFileChanged.emit(this.picList);
    }

    /**
     *  删除图片
     */
    deletePic(i: number) {
        this.picList.splice(i, 1);
        this.addPicClose = true;
        this.onFileChanged.emit(this.picList);
    }

    /**
     * 查看大图
     * @param index 图片列表中被点击的位置
     */
    openImg(index) {
        let photos = this.picList.map((value) => {
            return {
                url: value.content,
            }
        });
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: index
        });
        modal.present();
    }
}
