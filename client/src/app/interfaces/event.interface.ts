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

export const eventSchemaMock: IEventSchema = {
    _id: '111111111',
    name: 'Name',
    type: 'Type',
    state: 'State',
    startDate: new Date(),
    endDate: new Date(),
    location: {},
    owner: 'Owner',
    editors: [],
    participants: []
};

export const eventResponseMock: IEventResponse = {
    list: [eventSchemaMock],
    length: 1,
    qi: null
};

