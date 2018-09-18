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
import { EventLocationPipe } from './event-card/event-location.pipe';
import { EventDatePipe } from './event-card/event-date.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        EventsComponent,
        EventCardComponent,
        EventEditComponent,
        EventListComponent,
        EventLocationPipe,
        EventDatePipe
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        SharedModule,
        FormsModule,
        LoaderModule,
        TranslateModule
    ]
})
export class EventsModule {

}
