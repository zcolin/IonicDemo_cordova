import { NgModule } from '@angular/core';
import { ZFilechooserComponent } from './z-filechooser';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        ZFilechooserComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ZFilechooserComponent,
    ]
})
export class ZFilechooserModule { }
