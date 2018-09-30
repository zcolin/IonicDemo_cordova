import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZFilechooserGroupComponent} from "./z-filechooser-group";
import {IonicModule} from "ionic-angular";
import {ZFilechooserModule} from "../z-filechooser/z-filechooser.module";

@NgModule({
    declarations: [
        ZFilechooserGroupComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        ZFilechooserModule
    ],
    exports: [
        ZFilechooserGroupComponent,
    ]
})
export class ZFilechooserGroupModule {
}
