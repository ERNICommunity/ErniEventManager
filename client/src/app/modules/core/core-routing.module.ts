import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page-404/page-404.component';
import { NgModule } from '@angular/core';

const coreRoutes: Routes = [
    { path: '404', component: Page404Component },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [RouterModule.forChild(coreRoutes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
