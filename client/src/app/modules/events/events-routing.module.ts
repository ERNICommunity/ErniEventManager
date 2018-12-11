import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { NgModule } from '@angular/core';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventViewComponent } from './event-view/event-view.component';
import { AuthGuard } from '../../services/auth/auth-guard.service';
import { EventsResolver } from './events-resolver.service';

const eventsRoutes: Routes = [
    {
        path: '',
        component: EventsComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: EventListComponent,
                resolve: {events: EventsResolver},
            },
            {
                path: 'edit/:id',
                component: EventEditComponent
            },
            {
                path: 'view/:id',
                component: EventViewComponent
            },
            {
                path: ':type',
                component: EventListComponent,
                resolve: {events: EventsResolver},
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(eventsRoutes)],
    exports: [RouterModule]
})
export class EventsRoutingModule {}
