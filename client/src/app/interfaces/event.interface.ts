export class IEventRequest {
    data: IEventSchema;
}

export class IEventLocation {
    address?: string;
    gps?: string;
    room?: string;
    description?: string;
}

export class IEventAttributeSchema {
    name: String;
    mandatory: Boolean;
    multipleChoice: Boolean;
    choices: Array<String>;
    subAttributes?: Array<IEventAttributeSchema>;
}

export class IEventSchema {
    _id: string;
    name: string;
    type: string;
    state: string;
    startDate: Date;
    endDate: Date;
    location: IEventLocation;
    description?: string;
    owner: string;
    editors: Array<string>;
    participants: Array<string>;
    limit?: Number;
    customAttributes?: Array<IEventAttributeSchema>;
}

export class IEventResponse {
    list: Array<IEventSchema>;
    length: number;
    qi: string;
}
