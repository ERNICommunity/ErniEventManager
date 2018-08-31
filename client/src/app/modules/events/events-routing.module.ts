import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { NgModule } from '@angular/core';
import { EventEditComponent } from './event-edit/event-edit.component';

const eventsRoutes: Routes = [
    {
        path: '',
        component: EventsComponent,
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
