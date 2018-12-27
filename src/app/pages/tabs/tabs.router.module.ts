import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {JsBridgePage} from '../js-bridge/js-bridge';
import {AMapPage} from '../amap/amap';
import {ArcgisPage} from '../arcgis/arcgis';
import {TabUiPage} from '../tab-ui/tab-ui';
import {TabComponentPage} from '../tab-component/tab-component.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/(tab-ui:tab-ui)',
                pathMatch: 'full',
            },
            {
                path: 'tab-ui',
                outlet: 'tab-ui',
                component: TabUiPage
            },
            {
                path: 'tab-component',
                outlet: 'tab-component',
                component: TabComponentPage
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
        redirectTo: '/tabs/(tab-ui:tab-ui)',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
