import { Component, OnInit, Input } from '@angular/core';
import { IEventAttributeSchema, IEventSchema } from '../../interfaces';

@Component({
    selector: 'app-attribute-creator',
    templateUrl: './attribute-creator.component.html',
    styleUrls: ['./attribute-creator.component.scss']
})
export class AttributeCreatorComponent implements OnInit {
    @Input() event: IEventSchema;
    eventAttributes = Array<IEventAttributeSchema>();

    constructor() {}

    ngOnInit() {}

    create() {}

    edit() {}

    delete() {}
}
