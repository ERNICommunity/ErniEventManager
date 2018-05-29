import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { Page404Component } from './components/page-404/page-404.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventsComponent } from './components/events/events.component';

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
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'event/edit/:id', component: EventEditComponent },
    { path: '**', component: Page404Component }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
