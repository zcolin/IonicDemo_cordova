import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
    {path: 'item', loadChildren: './pages/item/item.module#ItemPageModule'},
    {path: 'list-page', loadChildren: './pages/list-page/list-page.module#ListPageModule'},
    {path: 'input', loadChildren: './pages/input/input.module#InputPageModule'},
    {path: 'echarts', loadChildren: './pages/echarts/echarts.module#EchartsPageModule'},
    {path: 'amap', loadChildren: './pages/amap/amap.module#AMapPageModule'},
    {path: 'jsbridge', loadChildren: './pages/js-bridge/js-bridge.module#JsBridgePageModule'},
    {path: 'arcgis', loadChildren: './pages/arcgis/arcgis.module#ArcgisPageModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
