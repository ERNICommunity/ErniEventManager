import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Page404Component } from './components/page-404/page-404.component';

import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
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
