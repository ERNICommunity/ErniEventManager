import * as mongoose from 'mongoose';
import { Response, Request, NextFunction } from 'express';
import { IEventSchema, IEventLocation } from '../../interfaces';


export type EventModel = mongoose.Document & {
    name: string;
    type: string;
    state: String;
    startDate: Date;
    endDate: Date;
    location: IEventLocation;
    description?: string;
    owner: String;
    editors: Array<String>;
    participants: Array<String>;
    limit?: Number;
    modifiedBy?: String;
    modified?: Date;
};

const EventSchema = new mongoose.Schema({
    name: {type: String},
    state: String,
    startDate: { type: Date},
    endDate: { type: Date},
    location: {
        address: String,
        gps: String,
        room: String,
        description: String},
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId },
    editors: [mongoose.Schema.Types.ObjectId],
    participants: [mongoose.Schema.Types.ObjectId],
    limit: Number
}, { timestamps: true });

EventSchema.index({ name: 1 }, { unique: true });

// In case of errors remove this from function parameters
EventSchema.pre('save', function (this: EventModel, next: NextFunction) {
    this.modified = new Date();
    next();
});

EventSchema.post('save', function (error: any, doc: any, next: NextFunction) {
    if (error.code === 11000) {
        next('Event already present, please change your data');
    } else {
        next(error);
    }
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
