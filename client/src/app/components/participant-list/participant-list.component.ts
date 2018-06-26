import { Component, OnInit } from '@angular/core';
import { IEventSchema } from '../../interfaces';

@Component({
    selector: 'app-participant-list',
    templateUrl: './participant-list.component.html',
    styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
    event = IEventSchema;

    constructor(event) {
        this.event = event;
    }

    ngOnInit() {}

    invite() {
        // TODO: invite participants via E-mail
    }

    export() {
        // TODO: export participants to CSV file
    }
}
