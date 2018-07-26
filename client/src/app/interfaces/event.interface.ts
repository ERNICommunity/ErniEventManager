export class IEventRequest {
    data: IEventSchema;
}

export class IRoomSchema {
    beds: number;
    people: Array<String>;
}

export class IEventAccommodationSchema {
    rooms: Array<IRoomSchema>;
}

export class IEventLocation {
    address?: string;
    gps?: string;
    room?: string;
    description?: string;
}

export enum IEventTransportType {
    bus, car
}

export class IEventTransportSchema {
    type: IEventTransportType;
    freePlaces: number;
    isReturning: boolean;
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
    transport?: Array<IEventTransportSchema>;
    accommodation?: IEventAccommodationSchema;
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
