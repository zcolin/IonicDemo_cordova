import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {TabUiPage} from '../tab-ui/tab-ui';
import {TabComponentPage} from '../tab-component/tab-component.page';
import {TabZorroAntPage} from '../tab-zorro-ant/tab-zorro-ant.page';

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
                path: 'tab-zorro-ant',
                outlet: 'tab-zorro-ant',
                component: TabZorroAntPage
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
