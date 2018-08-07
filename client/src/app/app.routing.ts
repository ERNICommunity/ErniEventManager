import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { Page404Component } from './components/page-404/page-404.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventsComponent } from './components/events/events.component';

import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'events',
        component: EventsComponent,
        children: [
            {
                path: '',
                component: EventListComponent
            },
            {
                path: ':type',
                component: EventListComponent
            },
        ]
    },
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
    { path: 'event/edit/:id', component: EventEditComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Page404Component }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
