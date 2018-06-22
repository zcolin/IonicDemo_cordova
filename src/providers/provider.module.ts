import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./httpservice/http.service";
import { UiService } from "./ui.service";
import { DbapiProvider } from "./dbapi/dbapi";

@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [
        HttpClientModule,
    ],
    providers: [
        HttpService,
        UiService,
        DbapiProvider,
    ]
})
export class ProviderModule {
}
