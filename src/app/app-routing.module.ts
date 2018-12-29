import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
    {path: 'item', loadChildren: './pages/ionic/item/item.module#ItemPageModule'},
    {path: 'list-page', loadChildren: './pages/ionic/list-page/list-page.module#ListPageModule'},
    {path: 'input', loadChildren: './pages/ionic/input/input.module#InputPageModule'},
    {path: 'echarts', loadChildren: './pages/echarts/echarts.module#EchartsPageModule'},
    {path: 'amap', loadChildren: './pages/amap/amap.module#AMapPageModule'},
    {path: 'jsbridge', loadChildren: './pages/js-bridge/js-bridge.module#JsBridgePageModule'},
    {path: 'arcgis', loadChildren: './pages/arcgis/arcgis.module#ArcgisPageModule'},
    {path: 'ant-tabs', loadChildren: './pages/zorro-ant/ant-tabs/ant-tabs.module#AntTabsPageModule'},
    {path: 'ant-datetime', loadChildren: './pages/zorro-ant/ant-datetime/ant-datetime.module#AntDatetimePageModule'},
    {path: 'ant-date-picker', loadChildren: './pages/zorro-ant/ant-date-picker/ant-date-picker.module#AntDatePickerPageModule'},
    {path: 'ant-ui-gather', loadChildren: './pages/zorro-ant/ant-ui-gather/ant-ui-gather.module#AntUiGatherPageModule'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
