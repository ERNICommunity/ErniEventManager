import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page-404/page-404.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../services/auth/auth-guard.service';

const coreRoutes: Routes = [
    { path: '404', component: Page404Component, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forChild(coreRoutes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
