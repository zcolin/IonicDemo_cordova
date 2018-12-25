import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {JsBridgePage} from '../js-bridge/js-bridge';
import {AMapPage} from '../amap/amap';
import {ArcgisPage} from '../arcgis/arcgis';
import {TabUiDemoPage} from '../tab-ui-demo/tab-ui-demo';
import {TabComponentDemoPage} from '../tab-component-demo/tab-component-demo.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/(tab-ui-demo:tab-ui-demo)',
                pathMatch: 'full',
            },
            {
                path: 'tab-ui-demo',
                outlet: 'tab-ui-demo',
                component: TabUiDemoPage
            },
            {
                path: 'tab-component-demo',
                outlet: 'tab-component-demo',
                component: TabComponentDemoPage
            },
            {
                path: 'jsbridge',
                outlet: 'jsbridge',
                component: JsBridgePage
            },
            {
                path: 'amap',
                outlet: 'amap',
                component: AMapPage
            },
            {
                path: 'arcgis',
                outlet: 'arcgis',
                component: ArcgisPage
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/(tab-ui-demo:tab-ui-demo)',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
