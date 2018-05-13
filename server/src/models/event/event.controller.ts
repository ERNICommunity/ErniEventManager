import { default as EventModel } from './event.model';
import { respondSuccess, handleError, allowedEventFields, pickProps, paginateProps } from '../../utils';
import { IEventSchema, IFindOption } from '../../interfaces';
import { Response, Request, NextFunction } from 'express';

const EventController: any = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { eventData } = req.body;
            const newEvent = new EventModel(eventData);
            if (await EventModel.create(newEvent)) {
                const event = await EventModel.findById(eventData._id, allowedEventFields);
                return respondSuccess(res, [])(event);
            }
            throw new Error('Problem with creating event');
        } catch (err) {
            return handleError(res)(err);
        }
    },

    get: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const event = await EventModel.findById(req.params.id, allowedEventFields);
            if (event) {
                return respondSuccess(res, [])(event);
            }
            throw new Error('Unable to find event');
        } catch (err) {
            return handleError(res)(err);
        }
    },

    queryPaginated: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventResponse = await EventController.queryDataPaginated(req.body);
            return respondSuccess(res, [])(eventResponse);
        } catch (err) {
            return handleError(res)(err);
        }
    },

    update: async function (req: Request, res: Response, next: NextFunction) {
        try {
            const { eventData } = req.body;
            if (await EventModel.findById(eventData._id)) {
                if (await EventModel.findByIdAndUpdate(eventData._id, eventData, { upsert: true })) {
                    const event = await EventModel.findById(eventData._id, allowedEventFields);
                    return respondSuccess(res, [])(event);
                }
                throw new Error('Problem with updating event');
            }
            throw new Error('Event not found');
        } catch (err) {
            return handleError(res)(err);
        }
    },

    delete: async function (req: Request, res: Response, next: NextFunction) {
        try {
            const { paginated, eventData} = req.body;
            if (await EventModel.findById(eventData._id)) {
                if (await EventModel.findOneAndRemove(eventData._id)) {
                    const eventResponse = await EventController.queryDataPaginated(paginated);
                    return respondSuccess(res, [])(eventResponse);
                }
                throw new Error('Problem with deleting event');
            }
            throw new Error ('You are not allowed to delete this entry');
        } catch (err) {
            return handleError(res)(err);
        }
    },

    queryDataPaginated: async (filterInfo: any, reqUser: string, isAdmin: boolean) => {
        try {
            let { filter, size, index, sort} = filterInfo;
            if (!filter) {
                filter = {};
            }
            size = (typeof size === 'number' && size > 0) ? size : 10;
            index = (typeof index === 'number') ? index : 0;
            sort = (typeof sort === 'undefined') ? sort : <any>{ way: '', field: 'date' };
            const mongoFilter: any = {};
            let counter = 10;
            for (const property of Object.keys(filter)) {
                const propValue = filter[property];
                if (counter-- < 0) {
                    throw new Error('Too many properties');
                } else if (propValue === undefined) {
                    continue;
                } else if (typeof (propValue) === 'number') {
                    mongoFilter[property] = propValue;
                } else if (typeof (propValue) === 'string') {
                    mongoFilter[property] = `/.*${propValue}*/i`;
                }
            }
            const list = await EventModel.find(mongoFilter, allowedEventFields)
                .skip(size * index)
                .limit(size)
                .sort(sort.way + sort.field)
                .exec();
            const length = await EventModel.count(mongoFilter);
            return {
                list,
                length,
                qi: filterInfo.qi
            };
        } catch (err) {
            throw err;
        }
    }

};

module.exports = EventController;
