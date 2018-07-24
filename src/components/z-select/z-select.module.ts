import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZSelectComponent} from "./z-select";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        ZSelectComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ZSelectComponent,
    ]
})
export class ZSelectModule {
}
