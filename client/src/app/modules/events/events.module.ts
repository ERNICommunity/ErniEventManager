import { NgModule } from '@angular/core';

import { EventsComponent } from './events.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { SharedModule } from '../shared/shared.module';
import { ParticipantListComponent } from './participant-list/participant-list.component';

@NgModule({
    declarations: [
        EventsComponent,
        EventCardComponent,
        EventEditComponent,
        EventListComponent,
        ParticipantListComponent
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        SharedModule,
        FormsModule,
        LoaderModule
    ]

})
export class EventsModule {

}
