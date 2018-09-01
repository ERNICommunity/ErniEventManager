import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page-404/page-404.component';
import { NgModule } from '@angular/core';

const coreRoutes: Routes = [
    { path: '**', component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forChild(coreRoutes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
