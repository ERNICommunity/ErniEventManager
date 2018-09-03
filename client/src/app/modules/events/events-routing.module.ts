import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { NgModule } from '@angular/core';
import { EventEditComponent } from './event-edit/event-edit.component';
import { AuthGuard } from '../../services/auth/auth-guard.service';
import { EventsResolver } from './events-resolver.service';

const eventsRoutes: Routes = [
    {
        path: '',
        component: EventsComponent,
        canActivateChild: [AuthGuard],
        resolve: {events: EventsResolver},
        children: [
            {
                path: '',
                component: EventListComponent
            },
            {
                path: 'edit/:id',
                component: EventEditComponent
            },
            {
                path: ':type',
                component: EventListComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(eventsRoutes)],
    exports: [RouterModule]
})
export class EventsRoutingModule {}
