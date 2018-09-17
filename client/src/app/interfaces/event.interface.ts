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
    gps?: string;
    room?: string;
    description?: string;

    constructor() {
        this.address = '';
        this.gps = '';
        this.room = '';
        this.description = '';
    }
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

    constructor() {
        this.name = '';
        this.type = 'TYPE_0';
        this.state = 'STATE_0';
        this.startDate = new Date();
        this.endDate = new Date();
        this.location = new IEventLocation();
        this.description = '';
        this.transportBus = false;
        this.transportCar = false;
        this.accommodation = false;
        this.participants = [];
        this.limit = 0;
    }
}

export class IEventResponse {
    list: Array<IEventSchema>;
    length: number;
    qi: string;
}

