/**
 * 文件信息
 */
export class ZFileEntity {
    type: string;       // 文件类型，如 image/jpeg
    name: string;       // 文件名
    content: string;    // 文件内容，base64存放
    file: any;          // 文件对象
    exif: any;          // exif信息
    remark: any;        // 备注信息
}
