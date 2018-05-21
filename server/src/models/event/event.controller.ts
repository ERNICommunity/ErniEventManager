import { default as EventModel } from './event.model';
import { respondSuccess, handleError, allowedEventFields, pickProps, paginateProps } from '../../utils';
import { IEventSchema, IFindOption } from '../../interfaces';
import { Response, Request, NextFunction } from 'express';

const EventController: any = {
    create: async (params: any) => {
        const newEvent = new EventModel(params);
        if (await EventModel.create(newEvent)) {
            const event = await EventModel.findById(params._id, allowedEventFields);
            return event;
        }
        throw new Error('Problem with creating event');
        
    },

    get: async (params: any) => {
        const event = await EventModel.findById(params.id, allowedEventFields);
        if (event) {
            return event;
        }
        throw new Error('Unable to find event');
    },

    getParticipants: async (params: any) => {
        const event = await EventModel.findById(params.id);
        if (event) {
            return event.participants;
        }
    },

    getAll: async (params: any) => {
        const eventResponse = await EventController.queryDataPaginated(params);
        return eventResponse;
    },

    update: async function (params: any) {
        const { id } = params;
        const { eventData } = params;
        delete eventData._id;
        if (await EventModel.findById(id)) {
            if (await EventModel.findByIdAndUpdate(id, eventData, { upsert: true })) {
                const event = await EventModel.findById(id, allowedEventFields);
                return event;
            }
            throw new Error('Problem with updating event');
        }
        throw new Error('Event not found');
    },

    delete: async function (params: any) {
        const { id } = params;
        const paginated = params;
        if (await EventModel.findById(id)) {
            if (await EventModel.findByIdAndRemove(id)) {
                const eventResponse = await EventController.queryDataPaginated(paginated);
                return eventResponse;
            }
            throw new Error('Problem with deleting event');
        }
        throw new Error ('You are not allowed to delete this entry');
    },

    queryDataPaginated: async (filterInfo: any, reqUser: string, isAdmin: boolean) => {
        try {
            let { filter, size, index, sort} = filterInfo;
            delete filterInfo.size;
            delete filterInfo.index;
            size = (typeof size === 'number' && size > 0) ? size : 10;
            index = (typeof index === 'number') ? index : 0;
            sort = (typeof sort !== 'undefined') ? sort : <any>{ way: '', field: 'date' };
            filter = {};
            for (const key of Object.keys(filterInfo)) {
                switch (key) {
                    case 'qi':
                        break;
                    case 'way':
                    case 'field':
                        sort[key] = filterInfo[key];
                        break;
                    default:
                        filter[key] = filterInfo[key];
                }
            }
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
