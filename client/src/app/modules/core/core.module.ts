import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { Page404Component } from './page-404/page-404.component';
import { CoreRoutingModule } from './core-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LeftSidebarComponent,
        Page404Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreRoutingModule,
        HttpClientModule
    ],
    exports: [
        LeftSidebarComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class CoreModule {}
