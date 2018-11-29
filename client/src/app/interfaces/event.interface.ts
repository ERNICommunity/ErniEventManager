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
    address: string;
    latitude?: string;
    longitude?: string;
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
    transportBus?: boolean;
    transportCar?: boolean;
    accommodation?: boolean;
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

