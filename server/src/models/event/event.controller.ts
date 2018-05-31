import { default as EventModel } from './event.model';
import { respondSuccess, handleError, allowedEventFields, pickProps, paginateProps } from '../../utils';
import { IEventSchema, IFindOption } from '../../interfaces';
import { Response, Request, NextFunction } from 'express';
import { Model } from 'mongoose';
import { default as GeneralController } from '../../utils/general-controller';

class EventController extends GeneralController {
    constructor(model: Model<any>) {
        super(model);
    }
}

module.exports = new EventController(EventModel);
