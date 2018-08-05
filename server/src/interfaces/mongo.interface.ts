import DateTimeFormat = Intl.DateTimeFormat;

export class IEventLocation {
    address?: string;
    gps?: string;
    room?: string;
    description?: string;
}

export class ITimeWindow{
    startDate: DateTimeFormat;
    endDate: DateTimeFormat;
    name: string;
}

export class IEventSchema {
    name: string;
    type: string;
    state: String;
    startDate?: Date;
    endDate: Date;
    location: IEventLocation;
    description?: string;
    owner: String;
    editors: Array<String>;
    participants: Array<String>;
    limit?: Number;
    modifiedBy?: String;
    modified?: Date;

    constructor() {
        this.name = '';
        this.type = 'TYPE_0';
        this.state = 'STATE_0';
        this.startDate = new Date();
        this.endDate = new Date();
        this.location = new IEventLocation();
        this.owner = 'Unknown';
        this.editors = [];
        this.participants = [];
    }
}

export class ISubEventSchema {
    name: string;
    event: string;
    timeWindow: ITimeWindow;
    location: IEventLocation;
    description?: string;
    owner: string;
    participants: Array<String>;
    limit?: number;

    constructor() {
        this.name = '';
        this.event = 'Unknown';
        this.timeWindow = new ITimeWindow();
        this.location = new IEventLocation();
        this.owner = 'Unknown';
        this.participants = [];
        this.limit = 5;
    }
}

export class IFindOption {
    owner?: string;
    editors?: string;
    participants?: string;
    _id?: string;
}
