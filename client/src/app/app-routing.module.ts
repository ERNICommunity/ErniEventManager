import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    {
        path: 'events',
        loadChildren: './modules/events/events.module#EventsModule',
        canLoad: [AuthGuard]
    } ,
    {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule',
        canLoad: [AuthGuard]
    },
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
