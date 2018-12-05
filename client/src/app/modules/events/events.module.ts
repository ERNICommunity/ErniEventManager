import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TagInputModule } from 'ngx-chips';
import { MapComponent } from '../core/map/map.component';
import { LoaderModule } from '../loader/loader.module';
import { SharedModule } from '../shared/shared.module';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDatePipe } from './event-card/event-date.pipe';
import { EventLocationPipe } from './event-card/event-location.pipe';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { InviteDialogComponent } from './participant-list/invite-dialog/invite-dialog.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';


@NgModule({
    declarations: [
        EventsComponent,
        EventCardComponent,
        EventEditComponent,
        EventListComponent,
        ParticipantListComponent,
        EventLocationPipe,
        EventDatePipe,
        InviteDialogComponent,
        MapComponent
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        FormsModule,
        LoaderModule,
        ReactiveFormsModule,
        SharedModule,
        TagInputModule,
        TranslateModule
    ]
})
export class EventsModule {

}
