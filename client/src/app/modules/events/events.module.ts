import { NgModule } from '@angular/core';

import { EventsComponent } from './events.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { SharedModule } from '../shared/shared.module';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { EventLocationPipe } from './event-card/event-location.pipe';
import { EventDatePipe } from './event-card/event-date.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { InviteDialogComponent } from './participant-list/invite-dialog/invite-dialog.component';

@NgModule({
    declarations: [
        EventsComponent,
        EventCardComponent,
        EventEditComponent,
        EventListComponent,
        ParticipantListComponent,
        EventLocationPipe,
        EventDatePipe,
        InviteDialogComponent
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        SharedModule,
        FormsModule,
        LoaderModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class EventsModule {

}
