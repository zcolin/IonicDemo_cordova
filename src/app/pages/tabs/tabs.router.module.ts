import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab-ui',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-ui/tab-ui.module#TabUiModule'
                    }
                ]
            },
            {
                path: 'tab-component',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-component/tab-component.module#TabComponentModule'
                    }
                ]
            },
            {
                path: 'tab-zorro-ant',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab-zorro-ant/tab-zorro-ant.module#TabZorroAntModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab-ui',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
