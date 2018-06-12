import { respondSuccess, handleError, allowedEventFields, pickProps, paginateProps } from '../utils';
import { IEventSchema, IFindOption } from '../interfaces';
import { Response, Request, NextFunction } from 'express';
import { Model } from 'mongoose';

class GeneralController {
    public model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async create(params: any) {
        const newEvent = new this.model(params.eventData);
        if (await this.model.create(newEvent)) {
            const event = await this.model.findById(newEvent._id, allowedEventFields);
            return event;
        }
        throw new Error('Problem with creating event');

    }

    async get(params: any) {
        const event = await this.model.findById(params.id, allowedEventFields);
        if (event) {
            return event;
        }
        throw new Error('Unable to find event');
    }

    async getAll(params: any) {
        const eventResponse = await this.queryDataPaginated(params);
        return eventResponse;
    }

    async update(params: any) {
        const { id } = params;
        const { eventData } = params;
        delete eventData._id;
        if (await this.model.findById(id)) {
            if (await this.model.findByIdAndUpdate(id, eventData, { upsert: true })) {
                const event = await this.model.findById(id, allowedEventFields);
                return event;
            }
            throw new Error('Problem with updating event');
        }
        throw new Error('Event not found');
    }

    async delete(params: any) {
        const { id } = params;
        const paginated = params;
        if (await this.model.findById(id)) {
            if (await this.model.findByIdAndRemove(id)) {
                const eventResponse = await this.queryDataPaginated(params);
                return eventResponse;
            }
            throw new Error('Problem with deleting event');
        }
        throw new Error ('You are not allowed to delete this entry');
    }

    async queryDataPaginated(filterInfo: any, reqUser?: string, isAdmin?: boolean) {
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
            const list = await this.model.find(mongoFilter, allowedEventFields)
                .skip(size * index)
                .limit(size)
                .sort(sort.way + sort.field)
                .exec();
            const length = await this.model.count(mongoFilter);
            return {
                list,
                length,
                qi: filterInfo.qi
            };
        } catch (err) {
            throw err;
        }
    }

}

export default GeneralController;
