export class IEventRequest {
    data: IEventSchema;
}

export class IEventLocation {
    address?: string;
    gps?: string;
    room?: string;
    description?: string;
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
}

export class IEventResponse {
    list: Array<IEventSchema>;
    length: number;
    qi: string;
}

