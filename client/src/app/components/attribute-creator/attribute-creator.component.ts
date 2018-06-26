import { Component, OnInit } from '@angular/core';
import { IEventAttributeSchema, IEventSchema } from '../../interfaces';

@Component({
    selector: 'app-attribute-creator',
    templateUrl: './attribute-creator.component.html',
    styleUrls: ['./attribute-creator.component.scss']
})
export class AttributeCreatorComponent implements OnInit {
    event = IEventSchema;
    eventAttributes = Array<IEventAttributeSchema>();

    constructor(event) {
        this.event = event;
    }

    ngOnInit() {}

    create() {}

    edit() {}

    delete() {}
}
