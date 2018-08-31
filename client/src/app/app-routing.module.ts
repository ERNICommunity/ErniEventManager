import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Page404Component } from './components/page-404/page-404.component';

import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: '',
                component: UserListComponent
            }
        ]
    },
    { path: 'user/edit/:id', component: UserEditComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Page404Component }
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
