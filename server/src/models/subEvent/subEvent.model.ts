import * as mongoose from 'mongoose';
import { NextFunction } from 'express';
import { ITimeWindow, IEventLocation } from '../../interfaces';

export type subEventModel = mongoose.Document & {
    name: String;
    event: String;
    timeWindow: ITimeWindow;
    location: IEventLocation;
    description?: String;
    owner: String;
    participants: Array<String>;
    limit?: Number;
};

const subEventSchema = new mongoose.Schema({
    name: {type: String},
    event: {type: mongoose.Schema.Types.ObjectId },
    timeEvent: {
        startDate: Date,
        endDate: Date,
        name: String
    },
    location: {
        address: String,
        gps: String,
        room: String,
        description: String},
    description: {type: String},
    owner: { type: mongoose.Schema.Types.ObjectId },
    participants: [mongoose.Schema.Types.ObjectId],
    limit: Number
}, { timestamps: true });

subEventSchema.index({ name: 1 }, { unique: true });

subEventSchema.pre('save', function (this: subEventModel, next: NextFunction) {
    next();
});

subEventSchema.post('save', function (error: any, doc: any, next: NextFunction) {
    //todo do some check in save opeartion
    next();
});

const SubEvent = mongoose.model('SubEvent', subEventSchema);
export default SubEvent;
