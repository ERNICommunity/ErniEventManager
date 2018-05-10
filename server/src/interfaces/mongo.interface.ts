export class IEventLocation {
    address?: string;
    gps?: string;
    room?: string;
    description?: string;
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

export class IFindOption {
    owner?: string;
    editors?: string;
    participants?: string;
    _id?: string;
}
