import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {DbapiProvider} from './dbapi/dbapi';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [
        HttpClientModule,
    ],
    providers: [
        DbapiProvider,
    ]
})
export class ProviderModule {
}
